import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 2;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readLinesAsNumberArrays();
    return _.sumBy(input, line => getRowDivisionValue(line));
}

function getRowDivisionValue(row: number[]): number {
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