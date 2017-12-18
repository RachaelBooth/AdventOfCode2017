import * as _ from 'lodash';

const day = 17;

export function solve(): string {
    const stepNumber = 316;
    let currentPosition = 0;
    let steps = 0;
    let secondElement = null;
    while (steps < 50000000) {
        steps = steps + 1;
        currentPosition = ((currentPosition + stepNumber) % steps) + 1;
        if (currentPosition === 1) {
            secondElement = steps;
        }
    }
    return secondElement.toString();
}