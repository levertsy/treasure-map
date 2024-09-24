import { Adventurer } from "./adventurer";
import { Mountain } from "./mountain";
import { Treasure } from "./treasure";

export interface TreasuresMap {
    width: number,
    height: number,
    adventurers: Adventurer[]
    mountains: Mountain[]
    treasures: Treasure[]
}