import { TreasuresMap } from "../models/treasuresMap"
import { Init } from "./init"
import fs from 'fs'

describe('testing init file', () => {
    const map: TreasuresMap = {height: 4, width: 3, 
        mountains: [{heightIndex: 0, widthIndex: 1}], 
        adventurers: [{name: 'Lara', widthIndex: 1, heightIndex: 1, direction: 'S', actions:'AGD', treasuresNumber: 0}],
        treasures: [{widthIndex: 1, heightIndex: 3, numberRemaining: 3}]
    }
    const mockText = `C - 3 - 4\n
                    #ignore\n
                    M - 1 - 0\n
                    T - 1 - 3 - 3\n
                    A - Lara - 1 - 1 - S - AGD`
    let init: Init
    let initProt: any

    beforeEach(() => {
        init = new Init()
        initProt = Object.getPrototypeOf(init)
    })

    test('writing in output file', () => {
        initProt.map = map
        initProt.writeOutput()

        const expectedOutput = `C - 3 - 4\nM - 1 - 0\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - 0\n`

        expect(fs.readFileSync('./data/outputFile.txt', 'utf-8')).toEqual(expectedOutput)
    })

    test('testing that all functions are called when initit the game', () => {
        jest.mock('fs')
        fs.readFileSync = jest.fn().mockReturnValueOnce(mockText)
        jest.spyOn(initProt, 'initMap')
        jest.spyOn(initProt, 'executeGame')
        jest.spyOn(initProt, 'writeOutput')
        init.initGame()

        expect(initProt.initMap).toHaveBeenCalled()
        expect(initProt.executeGame).toHaveBeenCalled()
        expect(initProt.writeOutput).toHaveBeenCalled()
    })

    test('expect map to be initialised', () => {
        jest.spyOn(initProt, 'createTreasure')
        jest.spyOn(initProt, 'createMountain')
        jest.spyOn(initProt, 'createAdventurer')
        initProt.map = {height: 0, width: 0, mountains: [], treasures: [], adventurers: []}
        initProt.initMap(['C - 3 - 4', 'M - 1 - 0', 'T - 1 - 3 - 3', '#ignore', 'A - Lara - 1 - 1 - S - AGD'])

        expect(initProt.map).toEqual(map)
        expect(initProt.createTreasure).toHaveBeenCalled()
        expect(initProt.createMountain).toHaveBeenCalled()
        expect(initProt.createAdventurer).toHaveBeenCalled()
    })
})
