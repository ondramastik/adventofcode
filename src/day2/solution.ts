import {loadTestData} from "../utils";

/**
 * What would your total score be if everything goes exactly according to your strategy guide?
 */
function solvePart1(options: [OpponentOption, PlayerOption][]): number {
    return options.map(([option1, option2]) => evaluateRound(option1, option2))
        .reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
}

/**
 * @return total score gain
 */
function evaluateRound(option1: OpponentOption, option2: PlayerOption): number {
    if (option1 === OpponentOption.Rock && option2 === PlayerOption.Rock
        || option1 === OpponentOption.Paper && option2 === PlayerOption.Paper
        || option1 === OpponentOption.Scissors && option2 === PlayerOption.Scissors) {
        return 3 + getOptionScore(option2)
    } else if (option1 == OpponentOption.Rock && option2 == PlayerOption.Scissors
        || option1 == OpponentOption.Paper && option2 == PlayerOption.Rock
        || option1 == OpponentOption.Scissors && option2 == PlayerOption.Paper) {
        return 0 + getOptionScore(option2)
    } else {
        return 6 + getOptionScore(option2)
    }
}

function getOptionScore(option: PlayerOption) {
    switch (option) {
        case PlayerOption.Rock:
            return 1;
        case PlayerOption.Paper:
            return 2;
        case PlayerOption.Scissors:
            return 3;
    }
}

function parseTestData(rawData: string): [OpponentOption, PlayerOption][] {
    return rawData.split(/\r?\n/)
        .map(value => [value.charAt(0) as OpponentOption, value.charAt(2) as PlayerOption]);
}

loadTestData("src/day2/input")
    .then((data) => parseTestData(data))
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(data)}`)
    })

enum OpponentOption {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C',
}

enum PlayerOption {
    Rock = 'X',
    Paper = 'Y',
    Scissors = 'Z',
}