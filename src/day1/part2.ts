import { readWholeInput, readInputLines } from '../utils/parseInput';
import * as _ from 'lodash';

const day = 1;

export function solve(): string {
    const input = readWholeInput(day);
    return findSum(input).toString();
}

function findSum(input: string): number {
    const halfLength = input.length * 0.5;
    let i = 0;
    let sum = 0;
    while (i < halfLength) {
        if (input[i] === input[i + halfLength]) {
            sum = sum + _.parseInt(input[i]);
        }
        i++;
    }
    return sum * 2;
}