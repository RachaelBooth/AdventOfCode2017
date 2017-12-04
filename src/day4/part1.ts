import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 4;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readLinesAsWordArrays();
    return _.filter(input, passphrase => passphraseIsValid(passphrase)).length;
}

function passphraseIsValid(phrase: string[]): boolean {
    return _.uniq(phrase).length === phrase.length;
}