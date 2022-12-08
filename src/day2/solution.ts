import {loadTestData} from "../utils";

/**
 * What would your total score be if everything goes exactly according to your strategy guide?
 */
function solvePart1(options: [OpponentOption, PlayerOption][]): number {
    /**
     * @return total score gainł
     */
    const evaluateRound: (option1: OpponentOption, option2: PlayerOption) => number = (option1, option2) => {
        if (option1 === OpponentOption.Rock && option2 === PlayerOption.Rock
            || option1 === OpponentOption.Paper && option2 === PlayerOption.Paper
            || option1 === OpponentOption.Scissors && option2 === PlayerOption.Scissors) {
            return getResultPoints(RoundResult.Draw) + getOptionPoints(option2)
        } else if (option1 == OpponentOption.Rock && option2 == PlayerOption.Scissors
            || option1 == OpponentOption.Paper && option2 == PlayerOption.Rock
            || option1 == OpponentOption.Scissors && option2 == PlayerOption.Paper) {
            return getOptionPoints(option2)
        } else {
            return getResultPoints(RoundResult.Win) + getOptionPoints(option2)
        }
    }

    return options.map(([option1, option2]) => evaluateRound(option1, option2))
        .reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
}

/**
 * What would your total score be if everything goes exactly according to your strategy guide?
 */
function solvePart2(options: [OpponentOption, RoundResult][]): number {
    /**
     * @return total score gain
     */
    const evaluateRound: (option1: OpponentOption, result: RoundResult) => number = (option1, result) => {
        let optionPoints = 0;
        switch (result) {
            case RoundResult.Lose:
                switch (option1) {
                    case OpponentOption.Rock:
                        optionPoints = getOptionPoints(PlayerOption.Scissors)
                        break
                    case OpponentOption.Paper:
                        optionPoints = getOptionPoints(PlayerOption.Rock)
                        break
                    case OpponentOption.Scissors:
                        optionPoints = getOptionPoints(PlayerOption.Paper)
                        break
                }
                break
            case RoundResult.Draw:
                switch (option1) {
                    case OpponentOption.Rock:
                        optionPoints = getOptionPoints(PlayerOption.Rock)
                        break
                    case OpponentOption.Paper:
                        optionPoints = getOptionPoints(PlayerOption.Paper)
                        break
                    case OpponentOption.Scissors:
                        optionPoints = getOptionPoints(PlayerOption.Scissors)
                        break
                }
                break
            case RoundResult.Win:
                switch (option1) {
                    case OpponentOption.Rock:
                        optionPoints = getOptionPoints(PlayerOption.Paper)
                        break
                    case OpponentOption.Paper:
                        optionPoints = getOptionPoints(PlayerOption.Scissors)
                        break
                    case OpponentOption.Scissors:
                        optionPoints = getOptionPoints(PlayerOption.Rock)
                        break
                }
                break
        }

        return getResultPoints(result) + optionPoints;
    }

    return options.map(([option1, option2]) => evaluateRound(option1, option2))
        .reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
}

function getOptionPoints(option: PlayerOption) {
    switch (option) {
        case PlayerOption.Rock:
            return 1;
        case PlayerOption.Paper:
            return 2;
        case PlayerOption.Scissors:
            return 3;
    }
}

function getResultPoints(result: RoundResult) {
    switch (result) {
        case RoundResult.Lose:
            return 0;
        case RoundResult.Draw:
            return 3;
        case RoundResult.Win:
            return 6;
    }
}

function parseTestData<T>(rawData: string): [OpponentOption, T][] {
    return rawData.split(/\r?\n/)
        .map(value => [value.charAt(0) as OpponentOption, value.charAt(2) as unknown as T]);
}

loadTestData("src/day2/input")
    .then((data) => {
        console.log(`Answer to part 1 is ${solvePart1(parseTestData(data))}`)
        console.log(`Answer to part 2 is ${solvePart2(parseTestData(data))}`)
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

enum RoundResult {
    Lose = 'X',
    Draw = 'Y',
    Win = 'Z',
}