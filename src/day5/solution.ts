import {loadTestData} from "../utils";

type Stacks = string[][]

interface RearrangeStep {
    from: number
    to: number
    amount: number
}

interface RearrangeMeta {
    stacks: Stacks
    steps: RearrangeStep[]
}

/**
 * After the rearrangement procedure completes, what crate ends up on top of each stack?
 */
function solvePart1(meta: RearrangeMeta): string {
    meta.steps.forEach((step) => {
        for (let i = 0; i < step.amount; i++) {
            meta.stacks[step.to - 1].push(meta.stacks[step.from - 1].pop()!)
        }
    })

    return meta.stacks.map(stack => stack.pop()!.charAt(1)).join("")
}

/**
 * After the rearrangement procedure completes, what crate ends up on top of each stack?
 */
function solvePart2(meta: RearrangeMeta): string {
    meta.steps.forEach((step) => {
        meta.stacks[step.to - 1].push(...meta.stacks[step.from - 1].splice(meta.stacks[step.from - 1].length - step.amount)!)
    })

    return meta.stacks.map(stack => stack.pop()!.charAt(1)).join("")
}

function parseTestData<T>(rawData: string): RearrangeMeta {
    const [rawStacks, rawSteps] = rawData.split(/\r?\n\r?\n/)
    const stacks: string[][] = [];

    rawStacks.split(/\r?\n/).forEach((raw) => {
        const slots = raw.match(/.{1,4}/g) || [];
        for (let i = 0; i < slots.length; i++) {
            const slotValue = slots[i].trim();
            if (slotValue.length > 0) {
                if (stacks[i] === undefined) {
                    stacks[i] = []
                }
                stacks[i].unshift(slotValue)
            }
        }

        return slots;
    })

    const steps = rawSteps.split(/\r?\n/).map((raw) => {
        const [amount, from, to] = Array(...(raw.match(/\d+/g) || []));
        return {
            from: Number(from), to: Number(to), amount: Number(amount)
        }
    });

    return {
        stacks,
        steps
    }
}

loadTestData("src/day5/input")
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(parseTestData(data))}`)
        console.log(`Answer to part 2 is ${solvePart2(parseTestData(data))}`)
    })
