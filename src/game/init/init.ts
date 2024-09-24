import { Adventurer } from '../models/adventurer';
import { Mountain } from '../models/mountain';
import { Treasure } from '../models/treasure';
import { TreasuresMap } from '../models/treasuresMap'
import { Actions } from '../actions/actions';
import { readFileSync } from 'fs';


export class Init {
    map: TreasuresMap = {height: 0, width: 0, mountains: [], treasures: [], adventurers: []}
    
    initGame() {
        // Replacing CRLF end of file with LF end of file to make sure every file works
        const fileLines = readFileSync('./data/inputFile.txt', 'utf-8').replace(/\r\n/g, '\n').split('\n')
        console.log(fileLines)
        this.initMap(fileLines)
        console.log(this.map)

    }

    

    private initMap(fileLines: string[]) {
        for (const line of fileLines) {
            if (line[0] !== '#') {
                const lineAsArray = line.split(' - ')
                switch (lineAsArray[0]) {
                    case 'C': {
                        this.map.height = parseInt(lineAsArray[2])
                        this.map.width = parseInt(lineAsArray[1])
                        break
                    }
                    case 'T': {
                        this.map.treasures.push(this.createTreasure(lineAsArray))
                        break
                    }
                    case 'M': {
                        this.map.mountains.push(this.createMountain(lineAsArray))
                        break
                    }
                    case 'A': {
                        this.map.adventurers.push(this.createAdventurer(lineAsArray))
                        break
                    }
                }
            }
        }
    }

    private createTreasure(line: string[]): Treasure {
        return {
            widthIndex: parseInt(line[1]),
            heightIndex: parseInt(line[2]),
            numberRemaining: parseInt(line[3]),
        }
    }

    private createMountain(line: string[]): Mountain {
        return {
            widthIndex: parseInt(line[1]),
            heightIndex: parseInt(line[2]),
        }
    }

    private createAdventurer(line: string []): Adventurer {
        return {
            widthIndex: parseInt(line[2]),
            heightIndex: parseInt(line[3]),
            name: line[1],
            direction: line[4],
            actions: line[5],
            treasuresNumber: 0
        }
    }

    private executeGame() {
        const actions = new Actions
        actions.executeAdventurerActions(this.map.adventurers)
    }
}