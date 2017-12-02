import { readWholeInput, readInputLines } from '../utils/parseInput';
import * as _ from 'lodash';

const day = 2;

export function solve(): string {
    const input = readInputLines(day);
    return _.sumBy(input, line => getRowDivisionValue(line));
}

function getRowDivisionValue(inputLine: string): number {
    const row = getNumbers(inputLine);
    let i = 0;
    while (i < row.length - 1) {
        let j = i + 1;
        while (j < row.length) {
            if (row[i] % row[j] === 0) {
                return row[i]/row[j];
            }
            if (row[j] % row[i] === 0) {
                return row[j]/row[i];
            }
            j++;
        }
        i++;
    }
}

function getNumbers(inputLine: string): number[] {
    const parts = inputLine.split(/\s+/);
    return _.map(parts, part => _.parseInt(part));
}