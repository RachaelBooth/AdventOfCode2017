import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const aStart = 634;
const bStart = 301;
const aFactor = 16807;
const bFactor = 48271;
const modulus = 2147483647;
// 2^16
const matchModulus = 65536;

export function solve(): string {
    let pairs = 0;
    let matches = 0;
    let aValue = aStart;
    let bValue = bStart;
    while (pairs < 40000000) {
        aValue = generateNextValue(aValue, aFactor);
        bValue = generateNextValue(bValue, bFactor);
        if (isMatch(aValue, bValue)) {
            matches = matches + 1;
        }
        pairs++;
    }
    return matches.toString();
}

function isMatch(aValue: number, bValue: number): boolean {
    return (aValue % matchModulus) === (bValue % matchModulus);
}

function generateNextValue(previousValue: number, factor: number): number {
    return (previousValue * factor) % modulus;
}