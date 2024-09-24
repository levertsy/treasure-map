import {TreasuresMap} from '../models/treasuresMap'

export class Init {
    init() {
        let map = {height: 4, width: 5, adventurers: [], mountains: [], treasures: []} as TreasuresMap
        console.log(map.height)
    }
}