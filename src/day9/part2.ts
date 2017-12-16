import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 9;
const inputParser = new InputParser(day);

let inGarbage = false;
let skipNext = false;
let garbageCharacters = 0;

export function solve(): string {
    const input = inputParser.readWholeInputAsCharacterArray();
    _.forEach(input, c => dealWithChar(c));
    return garbageCharacters.toString();
}

function dealWithChar(char: string): void {
    if (skipNext) {
        skipNext = false;
        return;
    }

    if (inGarbage) {
        if (char === '>') {
            inGarbage = false;
            return;
        }
        
        if (char === '!') {
            skipNext = true;
            return;
        }

        garbageCharacters = garbageCharacters + 1;
        return;
    }

    if (char === '<') {
        inGarbage = true;
        return;
    }
}