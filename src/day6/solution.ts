import {loadTestData} from "../utils";

/**
 * How many characters need to be processed before the first start-of-packet marker is detected?
 */
function solvePart1(signal: string): number {
    return findMarker(4, signal)
}

/**
 * After the rearrangement procedure completes, what crate ends up on top of each stack?
 */
function solvePart2(signal: string): number {
    return findMarker(14, signal)
}

function findMarker(length: number, signal: string) {
    const values = []

    for (let i = 0; i < signal.length; i++) {
        const currentChar = signal.charAt(i);
        values.push(currentChar)
        if (values.length === length) {
            if ((new Set(values)).size === values.length) {
                return i + 1;
            }
            values.shift()
        }
    }

    throw "No marker, invalid signal"
}

loadTestData("src/day6/input")
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(data)}`)
        console.log(`Answer to part 2 is ${solvePart2(data)}`)
    })
