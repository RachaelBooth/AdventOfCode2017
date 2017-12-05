import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 5;
const inputParser = new InputParser(day);

export function solve(): string {
    const instructions = _.flatten(inputParser.readLinesAsNumberArrays());
    const endOfList = instructions.length;
    let location = 0;
    let steps = 0;
    while (location >= 0 && location < endOfList) {
        let oldLocation = location;
        location = oldLocation + instructions[location];
        instructions[oldLocation] = updateInstruction(instructions[oldLocation]);
        steps++;
    }
    return steps.toString();
}

function updateInstruction(offset: number): number {
    if (offset >= 3) return offset - 1;
    return offset + 1;
}