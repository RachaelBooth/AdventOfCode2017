import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 2;
const inputHelper = new InputParser(day);

export function solve(): string {
    const input = inputHelper.readLinesAsNumberArrays();
    return _.sumBy(input, line => getRowDiff(line));
}

function getRowDiff(row: number[]): number {
    return _.max(row) - _.min(row);
}