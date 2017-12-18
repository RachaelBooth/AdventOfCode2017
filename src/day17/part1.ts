import * as _ from 'lodash';

const day = 17;

export function solve(): string {
    const stepNumber = 316;
    let buffer = [0];
    let currentPosition = 0;
    let steps = 0;
    while (steps < 2017) {
        steps = steps + 1;
        currentPosition = ((currentPosition + stepNumber) % buffer.length) + 1;
        buffer = _.concat(_.slice(buffer, 0, currentPosition), steps, _.slice(buffer, currentPosition));
    }
    return buffer[(currentPosition + 1) % 2018].toString();
}