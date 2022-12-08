import {loadTestData} from "../utils";

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

    const getItemPriority = (item: string) => {
        const charPriority = item.toLowerCase().charCodeAt(0) - 96;
        const isUpperCase = item === item.toUpperCase();

        return charPriority + (isUpperCase ? 26 : 0)
    }

    return rucksacks.map((rucksack) => findSharedItem(rucksack))
        .map((sharedItem) => getItemPriority(sharedItem))
        .reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
}


function parseTestData<T>(rawData: string): string[] {
    return rawData.split(/\r?\n/);
}

loadTestData("src/day3/input")
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(parseTestData(data))}`)
    })
