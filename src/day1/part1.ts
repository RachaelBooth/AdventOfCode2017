import { readWholeInput, readInputLines } from '../utils/parseInput';
import * as _ from 'lodash';

const day = 1;

export function solve(): string {
    const input = readWholeInput(day);
    return findSum(input).toString();
}

function findSum(input: string): number {
    const length = input.length;
    let i = 0;
    let sum = 0;
    while (i < length - 1) {
        if (input[i] === input[i + 1]) {
            sum = sum + _.parseInt(input[i]);
        }
        i++;
    }
    if (input[0] === input[i]) {
        sum = sum + _.parseInt(input[0]);
    }
    return sum;
}