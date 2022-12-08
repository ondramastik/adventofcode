import {loadTestData, sumArray} from "../utils";

/**
 * Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
 */
function solvePart1(rucksacks: string[]): number {
    const findSharedItem = (rucksack: string) => {
        const halfLength = rucksack.length / 2;
        const leftCompartment = rucksack.slice(0, halfLength);
        const rightCompartment = rucksack.slice(halfLength);

        for (const item of leftCompartment) {
            if (rightCompartment.includes(item)) {
                return item;
            }
        }

        throw "No common item found, invalid data"
    }

    return rucksacks.map((rucksack) => findSharedItem(rucksack))
        .map((sharedItem) => getItemPriority(sharedItem))
        .reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
}

/**
 * Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
 */
function solvePart2(rucksacks: string[]): number {
    const findSharedItem: (g: string[]) => string = (group) => {
        for (const item of group[0]) {
            if (group[1].includes(item) && group[2].includes(item)) {
                return item;
            }
        }

        throw "No common item found, invalid data"
    }

    const groups = [];

    while (rucksacks.length > 0)
        groups.push(rucksacks.splice(0, 3));

    return sumArray(groups.map((group) => getItemPriority(findSharedItem(group))));

}

function getItemPriority(item: string): number {
    const charPriority = item.toLowerCase().charCodeAt(0) - 96;
    const isUpperCase = item === item.toUpperCase();

    return charPriority + (isUpperCase ? 26 : 0)
}

function parseTestData<T>(rawData: string): string[] {
    return rawData.split(/\r?\n/);
}

loadTestData("src/day3/input")
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(parseTestData(data))}`)
        console.log(`Answer to part 2 is ${solvePart2(parseTestData(data))}`)
    })
