import { Adventurer } from "../models/adventurer";
import { Mountain } from "../models/mountain";
import { Treasure } from "../models/treasure";
import { TreasuresMap } from "../models/treasuresMap";
import { Actions } from "./actions";

describe('testing action file', () => {
    let montain: Mountain = {heightIndex: 3, widthIndex: 3}
    let adventurer: Adventurer = {heightIndex: 1, widthIndex: 1, name: 'Test', treasuresNumber: 0, direction: 'N', actions: 'AGD'}
    let treasure: Treasure = {heightIndex: 1, widthIndex: 1, numberRemaining: 2}
    let map: TreasuresMap = {height: 4, width: 4, mountains: [montain], treasures: [treasure], adventurers: [adventurer]}
    const actions = new Actions()
    const actionsProto = Object.getPrototypeOf(actions)

    beforeEach(() => {
      actionsProto.map = {height: 4, width: 4, mountains: [{heightIndex: 3, widthIndex: 3}], treasures: [{heightIndex: 1, widthIndex: 1, numberRemaining: 2}], adventurers: [{heightIndex: 1, widthIndex: 1, name: 'Test', treasuresNumber: 0, direction: 'N', actions: 'AGD'}]}
    })

    test('execute Action to go throw all actions', () => {
      jest.spyOn(actionsProto, 'moveForward')
      jest.spyOn(actionsProto, 'turnLeft')
      jest.spyOn(actionsProto, 'turnRight')

      actions.executeActions(map)
      expect(actionsProto.moveForward).toHaveBeenCalled()
      expect(actionsProto.turnLeft).toHaveBeenCalled()
      expect(actionsProto.turnRight).toHaveBeenCalled()
    });

    test('get max actions', () => {
      expect(actionsProto.getMaxAction()).toEqual(3)
    })

    test('move forward with directions', () => {
      actions.map.mountains = []

      actionsProto.moveForward(0)
      expect(actionsProto.map.adventurers[0].heightIndex).toEqual(0)

      actionsProto.map.adventurers[0].direction = 'O'
      actionsProto.moveForward(0)
      expect(actionsProto.map.adventurers[0].widthIndex).toEqual(0)

      actionsProto.map.adventurers[0].direction = 'E'
      actionsProto.moveForward(0)
      expect(actionsProto.map.adventurers[0].widthIndex).toEqual(1)

      actionsProto.map.adventurers[0].direction = 'S'
      actionsProto.moveForward(0)
      expect(actionsProto.map.adventurers[0].heightIndex).toEqual(1)
    })

    test('should collect treasure and update number', () => {
      actionsProto.collectTreasure(1, 1, 0)
      expect(actionsProto.map.treasures[0].numberRemaining).toEqual(1)
      expect(actionsProto.map.adventurers[0].treasuresNumber).toEqual(1)
    })

    test('checking new directions while turning left', () => {
      actionsProto.turnLeft(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('O')

      actionsProto.map.adventurers[0].direction = 'O'
      actionsProto.turnLeft(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('S')

      actionsProto.map.adventurers[0].direction = 'E'
      actionsProto.turnLeft(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('N')

      actionsProto.map.adventurers[0].direction = 'S'
      actionsProto.turnLeft(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('E')
    })

    test('checking new directions while turning right', () => {
      actionsProto.turnRight(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('E')

      actionsProto.map.adventurers[0].direction = 'O'
      actionsProto.turnRight(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('N')

      actionsProto.map.adventurers[0].direction = 'E'
      actionsProto.turnRight(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('S')

      actionsProto.map.adventurers[0].direction = 'S'
      actionsProto.turnRight(0)
      expect(actionsProto.map.adventurers[0].direction).toEqual('O')
    })
});