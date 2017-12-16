import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 16;
const inputParser = new InputParser(day);

let programmes = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];

export function solve(): string {
    const input = inputParser.readWholeInputAsCommaSeperatedWordArray();
    let times = 0;
    let previouslySeen = [programmes.join('')];
    while (times < 1000000000) {
        _.forEach(input, move => doMove(move));
        times++;
        if (_.includes(previouslySeen, programmes.join(''))) {
            const startOfLoop = _.findIndex(previouslySeen, p => p === programmes.join(''));
            const loopLength = previouslySeen.length - startOfLoop;
            const finalIndex = ((1000000000 - times) % loopLength) + startOfLoop;
            return previouslySeen[finalIndex];
        }
        previouslySeen.push(programmes.join(''));
    }
    return programmes.join('');
}

function doMove(move: string) {
    if (move[0] === 's') {
        const number = _.parseInt(move.substr(1));
        programmes = _.concat(_.slice(programmes, 16 - number), _.slice(programmes, 0, 16 - number));
    }
    if (move[0] === 'x') {
        const first = _.parseInt(move.split('/')[0].substr(1));
        const second = _.parseInt(move.split('/')[1]);
        const firstProgramme = programmes[first];
        programmes[first] = programmes[second];
        programmes[second] = firstProgramme;
    }
    if (move[0] === 'p') {
        const firstLocation = _.findIndex(programmes, p => p === move[1]);
        const secondLocation = _.findIndex(programmes, p => p === move[3]);
        programmes[firstLocation] = move[3];
        programmes[secondLocation] = move[1];
    }
}