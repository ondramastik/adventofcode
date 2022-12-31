import {loadTestData, sumArray} from "../utils";

interface Instruction {
    cost: 1 | 2
}

interface Noop extends Instruction {
    cost: 1
}

interface AddX extends Instruction {
    cost: 2
    value: number
}

function isAddX(instruction: Instruction): instruction is AddX {
    return instruction.hasOwnProperty("value");
}


function solvePart1(instructions: Instruction[]): number {
    return processInstruction(instructions)
}


function prepareBuffer(): string[][] {
    const createRow = () => {
        return new Array(40).fill(".")
    }
    return new Array(6).fill([]).map(() => createRow())
}

function writeToBuffer(buffer: string[][], counter: number, position: number) {
    const row = Math.floor(counter / 40);
    const column = (counter % 40) - 1
    const sprite = position;
    if ([sprite - 1, sprite, sprite + 1].includes(column)) {
        buffer[row][column] = "#"
    }
}

function processInstruction(instructions: Instruction[]) {
    let counter = 0;
    let register = 1;
    let buffer = prepareBuffer()
    const signalStrengths: number[] = []

    let currentInstruction = instructions.shift()
    while (currentInstruction) {
        counter++;
        if (counter === 241) {
            break;
        }
        currentInstruction.cost--

        if ((counter - 20) % 40 === 0) {
            signalStrengths.push(counter * register)
        }

        writeToBuffer(buffer, counter, register)

        if (currentInstruction.cost < 1) {
            if (isAddX(currentInstruction)) {
                register += currentInstruction.value
            }
            currentInstruction = instructions.shift()
        }
    }

    buffer.forEach(row => console.log(row.join("")))

    return sumArray(signalStrengths)
}

function parseTestData(rawData: string): Instruction[] {
    const lines: string[] = rawData.split(/\r?\n/)

    return lines.map((line) => {
        const data = line.split(" ")
        if (data.length > 1) {
            const [, value] = data
            return {
                cost: 2,
                value: Number(value)
            }
        } else {
            return {
                cost: 1
            }
        }

    })
}

loadTestData("src/day10/input")
    .then((data) => {
        const testData = parseTestData(data)
        console.log(`Answer to part 2 is:`)
        console.log(`Answer to part 1 is ${solvePart1(testData)}`)
    })
