import { readWholeInput, readInputLines } from '../utils/parseInput';
import * as _ from 'lodash';

const day = 2;

export function solve(): string {
    const input = readInputLines(day);
    return _.sumBy(input, line => getRowDiff(line));
}

function getRowDiff(inputLine: string): number {
    const row = getNumbers(inputLine);
    return _.max(row) - _.min(row);
}

function getNumbers(inputLine: string): number[] {
    const parts = inputLine.split(/\s+/);
    return _.map(parts, part => _.parseInt(part));
}