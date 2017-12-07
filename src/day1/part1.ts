import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 1;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readWholeInputAsNumberArrayOfChars();
    return findSum(input).toString();
}

function findSum(input: number[]): number {
    const length = input.length;
    let sum = 0;
    _.forEach(input, (value, index) => {
        if (value === input[(index + 1) % length]) {
            sum = sum + value;
        }
    });
    return sum;
}