import { Adventurer } from "../models/adventurer";
import { TreasuresMap } from "../models/treasuresMap";

export class Actions {
    map: TreasuresMap = {height: 0, width: 0, mountains: [], treasures: [], adventurers: []}

    executeActions(mapInitialised: TreasuresMap) {
        this.map = mapInitialised
        const adventurerNumber = this.map.adventurers.length
        const maxAction = this.getMaxAction()

        for (let actionIndex = 0; actionIndex < maxAction; actionIndex++) {
            for (let adventurerIndex = 0; adventurerIndex < adventurerNumber; adventurerIndex++) {
                const adventurer = this.map.adventurers[adventurerIndex]
                if (actionIndex < adventurer.actions.length) {
                    switch (adventurer.actions[actionIndex]) {
                        case 'A': 
                            this.moveForward(adventurerIndex)
                            break
                        case 'G':
                            this.turnLeft(adventurerIndex)
                            break
                        case 'D':
                            this.turnRight(adventurerIndex)
                            break
                    }
                }
            }
        }
        
    }

    private getMaxAction(): number {
        let max = 0
        for (const adventurer of this.map.adventurers) {
            if (adventurer.actions.length > max) max = adventurer.actions.length
        }
        return max
    }

    private moveForward(adventurerIndex: number) {
        if (this.canMove(this.map.adventurers[adventurerIndex])) {
            switch (this.map.adventurers[adventurerIndex].direction) {
                case 'N': 
                    this.map.adventurers[adventurerIndex].heightIndex--
                    break
                case 'E': 
                    this.map.adventurers[adventurerIndex].widthIndex++
                    break
                case 'S': 
                    this.map.adventurers[adventurerIndex].heightIndex++
                    break
                case 'O': 
                    this.map.adventurers[adventurerIndex].widthIndex--
                    break
            }
            this.collectTreasure(this.map.adventurers[adventurerIndex].widthIndex, this.map.adventurers[adventurerIndex].heightIndex, adventurerIndex)
        }
    }

    private collectTreasure(widthIndex: number, heightIndex: number, adventurerIndex: number) {
        const treasureIndex = this.map.treasures.findIndex((treasure) => 
            treasure.widthIndex === widthIndex && treasure.heightIndex === heightIndex
        )

        if (treasureIndex > -1) {
            if (this.map.treasures[treasureIndex].numberRemaining > 0) this.map.adventurers[adventurerIndex].treasuresNumber++
            this.map.treasures[treasureIndex].numberRemaining--
        }
    }

    private canMove(adventurer: Adventurer): boolean {
        const widthLimit = this.map.width - 1
        const heightLimit = this.map.height - 1

        switch(adventurer.direction) {
            case 'N': return adventurer.heightIndex > 0 && !this.hasSomethingForward(adventurer.widthIndex, adventurer.heightIndex - 1)
            case 'E': return adventurer.widthIndex < widthLimit && !this.hasSomethingForward(adventurer.widthIndex + 1, adventurer.heightIndex)
            case 'S': return adventurer.heightIndex < heightLimit && !this.hasSomethingForward(adventurer.widthIndex, adventurer.heightIndex + 1)
            case 'O': return adventurer.widthIndex > 0 && !this.hasSomethingForward(adventurer.widthIndex - 1, adventurer.heightIndex)
        }

        return true
    }

    private hasSomethingForward(widthIndex: number, heightIndex: number): boolean {
        return this.hasMountainForward(widthIndex, heightIndex) || this.hasAdventurerForward(widthIndex, heightIndex)
    }

    private hasMountainForward(widthIndex: number, heightIndex: number): boolean {       
        return this.map.mountains.findIndex((mountain) =>
            mountain.widthIndex === widthIndex && mountain.heightIndex === heightIndex
        ) !== -1
    }

    private hasAdventurerForward(widthIndex: number, heightIndex: number): boolean {       
        return this.map.adventurers.findIndex((adventurer) =>
            adventurer.widthIndex === widthIndex && adventurer.heightIndex === heightIndex
        ) !== -1
    }

    private turnRight(adventurerIndex: number) {
        switch (this.map.adventurers[adventurerIndex].direction) {
            case 'N': 
                this.map.adventurers[adventurerIndex].direction = 'E'
                break
            case 'E': 
                this.map.adventurers[adventurerIndex].direction = 'S'
                break
            case 'S': 
                this.map.adventurers[adventurerIndex].direction = 'O'
                break
            case 'O': 
                this.map.adventurers[adventurerIndex].direction = 'N'
                break
        }
    }

    private turnLeft(adventurerIndex: number) {
        switch (this.map.adventurers[adventurerIndex].direction) {
            case 'N': 
                this.map.adventurers[adventurerIndex].direction = 'O'
                break
            case 'E': 
                this.map.adventurers[adventurerIndex].direction = 'N'
                break
            case 'S': 
                this.map.adventurers[adventurerIndex].direction = 'E'
                break
            case 'O': 
                this.map.adventurers[adventurerIndex].direction = 'S'
                break
        }
    }
}