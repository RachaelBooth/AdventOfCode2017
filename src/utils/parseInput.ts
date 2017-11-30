import * as fs from 'fs'

export function readInputLines(day: number): string[] {
    const contents = readWholeInput(day);
    return contents.split('\r\n')
}

export function readWholeInput(day: number): string {
    return fs.readFileSync(`./src/day${day}/input.txt`, { encoding: 'utf8' });
}