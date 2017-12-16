import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 9;
const inputParser = new InputParser(day);

let totalScore = 0;
let currentOuterScore = 0;
let inGarbage = false;
let skipNext = false;

export function solve(): string {
    const input = inputParser.readWholeInputAsCharacterArray();
    _.forEach(input, c => dealWithChar(c));
    return totalScore.toString();
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

        return;
    }

    if (char === '<') {
        inGarbage = true;
        return;
    }

    if (char === '{') {
        let groupScore = currentOuterScore + 1;
        totalScore = totalScore + groupScore;
        currentOuterScore = groupScore;
        return;
    }

    if (char === '}') {
        currentOuterScore = currentOuterScore - 1;
    }
}