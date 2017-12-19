import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 19;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readLinesAsCharArrays();
    return getSteps(input).toString();
}

function getSteps(diagram: string[][]): number {
    let y = _.findIndex(diagram[0], el => el === '|');
    let x = 1;
    let direction: string = 'down';
    let steps = 1;
    while (true) {
        let d = diagram[x][y];
        if (d === ' ') {
            return steps;
        }

        steps = steps + 1;

        if (d === '+') {
            switch (direction) {
                case 'up':
                case 'down':
                    if (diagram[x][y - 1] !== ' ') {
                        direction = 'left';
                    } else {
                        direction = 'right';
                    }
                    break;
                case 'left':
                case 'right':
                    if (diagram[x - 1][y] != ' ') {
                        direction = 'up';
                    } else {
                        direction = 'down';
                    }
                    break;
            }
        }

        switch (direction) {
            case 'up':
                x = x - 1;
                break;
            case 'down':
                x = x + 1;
                break;
            case 'left':
                y = y - 1;
                break;
            case 'right':
                y = y + 1;
                break;
        }
    }
}
