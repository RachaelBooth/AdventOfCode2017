import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const aStart = 634;
const bStart = 301;
const aFactor = 16807;
const bFactor = 48271;
const aCondition = 4;
const bCondition = 8;
const modulus = 2147483647;
// 2^16
const matchModulus = 65536;

export function solve(): string {
    let pairs = 0;
    let matches = 0;
    let aValue = aStart;
    let bValue = bStart;
    while (pairs < 5000000) {
        aValue = generateNextValue(aValue, aFactor, aCondition);
        bValue = generateNextValue(bValue, bFactor, bCondition);
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

function generateNextValue(previousValue: number, factor: number, condition: number): number {
    let candidateValue = (previousValue * factor) % modulus;
    while (candidateValue % condition !== 0) {
        candidateValue = (candidateValue * factor) % modulus;
    }
    return candidateValue;
}