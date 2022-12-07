import {readFile} from 'fs';

/**
 * Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 */
function solvePart1(data: string): number {
    const elves = parseTestData(data)

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
function solvePart2(data: string): number {
    const elves = parseTestData(data)

    const foodCountPerElf = elves.map((foodCounts) => sumArray(foodCounts))

    return sumArray(foodCountPerElf.sort().slice(-3))
}

function loadTestData(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        readFile('src/day1/input', 'utf-8', (err, data) => {
            if (err) return reject(err);
            else return resolve(data);
        });
    })
}

function parseTestData(data: string): number[][] {
    const elves = data.split(/\r?\n\r?\n/).map(value => value.split(/\r?\n/));

    return elves.map(counts => counts.map((count) => {
        return Number(count);
    }));
}

function sumArray(numbers: number[]): number {
    return numbers.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
}

loadTestData()
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(data)}`)
        console.log(`Answer to part 2 is ${solvePart2(data)}`)
    })