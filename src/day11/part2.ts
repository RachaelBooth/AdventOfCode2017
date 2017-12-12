import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 11;
const inputParser = new InputParser(day);
let furthestSteps = 0;

export function solve(): string {
    const input = inputParser.readWholeInputAsCommaSeperatedWordArray();
    const endLocation = followPath(input);
    return furthestSteps.toString();
}

function getStepsNeeded(location: location): number {
    if (Math.abs(location.north) >= Math.abs(location.east)) {
        // N.B. By the construction, we know that abs(north) - abs(east) must be even.
        return Math.abs(location.east) + 0.5 * (Math.abs(location.north) - Math.abs(location.east));
    }

    const northCorrection = (Math.abs(location.east) - Math.abs(location.north)) % 2;
    return Math.abs(location.east) + northCorrection;
}

function followPath(path: string[]): location {
    let north = 0;
    let east = 0;
    _.forEach(path, step => {
        if (step === 'n') {
            north = north + 2;
        }

        if (step === 's') {
            north = north - 2;
        }

        if (step.length > 1) {
            if (step[0] === 'n') {
                north = north + 1;
            } else {
                north = north - 1;
            }

            if (step[1] === 'e') {
                east = east + 1;
            } else {
                east = east - 1;
            }
        }

        let steps = getStepsNeeded({ north, east });
        if (steps > furthestSteps) {
            furthestSteps = steps;
        }
    });
    return { north, east };
}

interface location {
    north: number,
    east: number
}