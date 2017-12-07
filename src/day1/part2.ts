import InputParser from '../utils/inputParser';

const day = 1;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readWholeInputAsNumberArrayOfChars();
    return findSum(input).toString();
}

function findSum(input: number[]): number {
    const halfLength = input.length * 0.5;
    let i = 0;
    let sum = 0;
    while (i < halfLength) {
        if (input[i] === input[i + halfLength]) {
            sum = sum + input[i];
        }
        i++;
    }
    return sum * 2;
}