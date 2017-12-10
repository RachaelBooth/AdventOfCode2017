import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 10;
const inputParser = new InputParser(day);
let list = _.range(256);
let currentPosition = 0;
let skipSize = 0;

export function solve(): string {
    const input = inputParser.readWholeInputAsCommaSeperatedNumberArray();
    _.forEach(input, length => doStep(length));
    return (list[0] * list[1]).toString();
}

function doStep(length: number): void {
    if (currentPosition + length <= 256) {
        const indicesToRemove = _.range(currentPosition, currentPosition + length);
        const removedElements = _.pullAt(list, indicesToRemove);
        const listBefore = _.slice(list, 0, currentPosition);
        const listAfter = _.slice(list, currentPosition);
        list = listBefore.concat(_.reverse(removedElements)).concat(listAfter);
    } else {
        const endIndicesToRemove = _.range(currentPosition, 256);
        const numberWrapped = currentPosition + length - 256;
        const startIndicesToRemove = _.range(0, numberWrapped);
        const removedElements = _.pullAt(list, endIndicesToRemove).concat(_.pullAt(list, startIndicesToRemove));
        const elementsToInsert = _.reverse(removedElements);
        list = _.slice(elementsToInsert, length - numberWrapped).concat(list).concat(_.slice(elementsToInsert, 0, length - numberWrapped));
    }
    currentPosition = (currentPosition + length + skipSize) % 256;
    skipSize = skipSize + 1; 
}

    