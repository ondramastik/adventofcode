import {loadTestData} from "../utils";

type Range = {
    from: number
    to: number
}
type RangesPair = [Range, Range]

/**
 * In how many assignment pairs does one range fully contain the other?
 */
function solvePart1(pairs: RangesPair[]): number {
    const containedPairs = pairs.filter((pair) => isContained(pair[0], pair[1]));

    return containedPairs.length
}

/**
 * In how many assignment pairs do the ranges overlap?
 */
function solvePart2(pairs: RangesPair[]): number {
    const isOverlapping: (r1: Range, r2: Range) => boolean = (range1, range2) => {
        return isContained(range1, range2) || range1.from >= range2.from && range1.from <= range2.to
            || range1.to >= range2.from && range1.to <= range2.to;
    }
    const containedPairs = pairs.filter((pair) => isOverlapping(pair[0], pair[1]));

    return containedPairs.length
}

const isContained: (r1: Range, r2: Range) => boolean = (range1, range2) => {
    return range1.from <= range2.from && range1.to >= range2.to || range1.from >= range2.from && range1.to <= range2.to;
}

function parseTestData<T>(rawData: string): RangesPair[] {
    return rawData.split(/\r?\n/)
        .map(pair => pair.split(","))
        .map((ranges) => {
            const [range1, range2] = ranges
            const [from1, to1] = range1.split("-")
            const [from2, to2] = range2.split("-")

            return [
                {
                    from: Number(from1),
                    to: Number(to1)
                }, {
                    from: Number(from2),
                    to: Number(to2)
                }
            ]
        })
}

loadTestData("src/day4/input2")
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(parseTestData(data))}`)
        console.log(`Answer to part 2 is ${solvePart2(parseTestData(data))}`)
    })
