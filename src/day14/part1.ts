import * as _ from 'lodash';
import KnotHash from './knotHash';

export function solve(): string {
    const input = 'ugkiagan'
    const rows = _.range(128);
    let used = 0;
    _.forEach(rows, row => {
        used = used + getUsed(input, row);
    });
    return used.toString();
}

function getUsed(input: string, row: number): number {
    const gridRow = getRow(input, row);
    return _.filter(gridRow, el => el === '1').length;
}

function getRow(input: string, row: number): string[] {
    const hash = new KnotHash().getKnotHash(`${input}-${row}`);
    return _.flatMap(hash, d => {
        const asNumber: number = _.parseInt(d, 16);
        const asBinaryString: string = _.padStart(asNumber.toString(2), 4, 0);
        return asBinaryString.split('');
    });
}

    