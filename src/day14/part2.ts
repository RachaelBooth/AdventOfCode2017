import * as _ from 'lodash';
import KnotHash from './knotHash';

export function solve(): string {
    const input = 'ugkiagan'
    let grid = getGrid(input);
    return countRegions(grid).toString();
}

function countRegions(grid: string[][]): number {
    let regions = 0;
    let x = 0;
    let y = 0;
    while (x < 128) {
        while (y < 128) {
            if (grid[x][y] === '1') {
                regions = regions + 1;
                removeRegion(grid, x, y);
            }
            y++;
        }
        y = 0;
        x++;
    }
    return regions;
}

function removeRegion(grid: string[][], x: number, y: number): void {
    if (x < 0 || x >= 128 || y < 0 || y >= 128) {
        return;
    }

    if (grid[x][y] === '1') {
        grid[x][y] = '0';
        removeRegion(grid, x + 1, y);
        removeRegion(grid, x - 1, y);
        removeRegion(grid, x, y + 1);
        removeRegion(grid, x, y - 1);
    }
}

function getGrid(input: string): string[][] {
    return _.map(_.range(128), row => getRow(input, row));
}

function getRow(input: string, row: number): string[] {
    const hash = new KnotHash().getKnotHash(`${input}-${row}`);
    return _.flatMap(hash, d => {
        const asNumber: number = _.parseInt(d, 16);
        const asBinaryString: string = _.padStart(asNumber.toString(2), 4, 0);
        return asBinaryString.split('');
    });
}

    