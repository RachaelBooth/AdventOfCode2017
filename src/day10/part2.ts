import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 10;
const inputParser = new InputParser(day);
let list = _.range(256);
let currentPosition = 0;
let skipSize = 0;

export function solve(): string {
    const input = inputParser.readWholeInputAsCharacterArray();
    const lengths = _.map(input, c => c.charCodeAt()).concat([17, 31, 73, 47, 23]);
    doRounds(lengths);
    let denseHash = getDenseHash();
    return getHash(denseHash);
}

function getHash(denseHash: number[]): string {
    return _.join(_.map(denseHash, el => getHex(el)), '');
}

function getHex(number: number): string {
    let hexRep = number.toString(16);
    if (hexRep.length < 2) {
        hexRep = '0' + hexRep;
    }
    return hexRep;
}

function getDenseHash(): number[] {
    return _.range(16).map(i => i * 16).map(index => xorBlock(_.slice(list, index, index + 16)));
}

function xorBlock(block: number[]): number {
    let answer = block[0];
    let i = 1;
    while (i < 16) {
        answer = answer ^ block[i];
        i++;
    }
    return answer;
}

function doRounds(lengths: number[]): void {
    let steps = 0;
    while (steps < 64) {
        doRound(lengths);
        steps++;
    }
}

function doRound(lengths: number[]): void {
    _.forEach(lengths, length => doStep(length));
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

    