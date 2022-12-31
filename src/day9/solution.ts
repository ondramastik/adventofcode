import {loadTestData} from "../utils";

enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

type Visit = string

interface RopeCell {
    currentX: number
    currentY: number
    visits: Set<Visit>
    previousCell?: RopeCell
    nextCell?: RopeCell
}

interface Motion {
    direction: Direction
    distance: number
}

function solvePart1(motions: Motion[]): number {
    const rope = simulateRope(motions, 2)

    return rope.previousCell!.visits.size
}

function solvePart2(motions: Motion[]): number {
    let currentRope = simulateRope(motions, 10)

    while (currentRope.previousCell) {
        currentRope = currentRope.previousCell
    }

    return currentRope!.visits.size
}

const transitionMap = new Map<string, [number, number]>([
    ["2/1", [1, 1]],
    ["1/2", [1, 1]],
    ["2/0", [1, 0]],
    ["2/-1", [1, -1]],
    ["1/-2", [1, -1]],
    ["0/-2", [0, -1]],
    ["-1/-2", [-1, -1]],
    ["-2/-1", [-1, -1]],
    ["-2/0", [-1, 0]],
    ["-2/1", [-1, 1]],
    ["-1/2", [-1, 1]],
    ["0/2", [0, 1]],
    ["2/2", [1, 1]],
    ["-2/-2", [-1, -1]],
    ["-2/2", [-1, 1]],
    ["2/-2", [1, -1]]
])

function simulateRope(motions: Motion[], length: number) {
    const moveRope = (cell: RopeCell) => {
        if (!cell.nextCell) return

        const diffX = cell.nextCell.currentX - cell.currentX
        const diffY = cell.nextCell.currentY - cell.currentY

        const transition = transitionMap.get(`${diffX}/${diffY}`)

        if (transition) {
            const [movementX, movementY] = transition
            cell.currentX += movementX
            cell.currentY += movementY
            cell.visits.add(`${cell.currentX}/${cell.currentY}`)
        }

        if (cell.previousCell) {
            moveRope(cell.previousCell)
        }
    }

    const mainCell = initializeRope(motions, length)

    motions.forEach((motion) => {
        for (let i = 0; i < motion.distance; i++) {
            if (motion.direction === Direction.Up) {
                mainCell.currentX--;
            } else if (motion.direction === Direction.Down) {
                mainCell.currentX++;
            } else if (motion.direction === Direction.Left) {
                mainCell.currentY--;
            } else if (motion.direction === Direction.Right) {
                mainCell.currentY++;
            }
            mainCell.visits.add(`${mainCell.currentX}/${mainCell.currentY}`)

            mainCell.previousCell && moveRope(mainCell.previousCell)
        }
    })

    return mainCell;
}

function initializeRope(motions: Motion[], length: number): RopeCell {
    const mainCell: RopeCell = {
        visits: new Set<Visit>(["0/0"]),
        currentX: 0,
        currentY: 0
    }

    let currentCell = mainCell;
    for (let i = 1; i < length; i++) {
        let newCell = {
            visits: new Set<Visit>(mainCell.visits),
            nextCell: currentCell,
            currentX: currentCell.currentX,
            currentY: currentCell.currentY
        }
        currentCell.previousCell = newCell

        currentCell = newCell
    }

    return mainCell
}


function parseTestData(rawData: string): Motion[] {
    const lines: string[] = rawData.split(/\r?\n/)

    return lines.map((line) => {
        const [direction, distance] = line.split(" ")
        return {
            direction: direction as Direction,
            distance: Number(distance)
        }
    })
}

loadTestData("src/day9/input")
    .then((data) => {
        const testData = parseTestData(data)
        console.log(`Answer to part 1 is ${solvePart1(testData)}`)
        console.log(`Answer to part 2 is ${solvePart2(testData)}`)
    })
