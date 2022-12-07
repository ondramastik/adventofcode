import {loadTestData} from "../utils";

/**
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 */
function solvePart1(elves: number[][]): number {
    let maxFood = 0;
    elves.forEach((foodCounts) => {
        const totalFood = sumArray(foodCounts)
        if (totalFood > maxFood) {
            maxFood = totalFood;
        }
    })

    return maxFood;
}

/**
 * Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
 */
function solvePart2(elves: number[][]): number {
    const foodCountPerElf = elves.map((foodCounts) => sumArray(foodCounts))

    return sumArray(foodCountPerElf.sort().slice(-3))
}

function parseTestData(rawData: string): number[][] {
    const elves = rawData.split(/\r?\n\r?\n/).map(value => value.split(/\r?\n/));

    return elves.map(counts => counts.map((count) => {
        return Number(count);
    }));
}

function sumArray(numbers: number[]): number {
    return numbers.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
}

loadTestData("src/day1/input")
    .then((data) => parseTestData(data))
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(data)}`)
        console.log(`Answer to part 2 is ${solvePart2(data)}`)
    })