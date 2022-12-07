import {readFile} from 'fs';

function solve(data: string) {
    const elves = data.split(/\r?\n\r?\n/).map(value => value.split(/\r?\n/));

    const elvesFood = elves.map(counts => counts.map((count) => {
        return Number(count);
    }));

    let maxFood = 0;
    elvesFood.forEach((foodCounts) => {
        const totalFood = foodCounts.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
        if (totalFood > maxFood) {
            maxFood = totalFood;
        }
    })

    console.log(maxFood)
}

function loadTestData(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        readFile('src/day1/input', 'utf-8', (err, data) => {
            if (err) return reject(err);
            else return resolve(data);
        });
    })
}

loadTestData().then((data) => solve(data))