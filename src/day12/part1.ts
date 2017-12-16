import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 12;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    let pipes = _.map(input, line => parseLine(line));
    let zeroGroup = [0];
    let oldLength = 0;
    while (zeroGroup.length != oldLength) {
        oldLength = zeroGroup.length;
        _.forEach(zeroGroup, element => {
            const elementLinks: communicationLinks[] = _.remove(pipes, l => l.programme === element);
            if (elementLinks.length > 0) {
                zeroGroup.push(...elementLinks[0].links);
            }
            // N.B. each should only be once in input.
        });
        zeroGroup = _.uniq(zeroGroup);
    }
    return zeroGroup.length.toString();
}

function parseLine(line: string): communicationLinks {
    const splitLine = line.split(' ');
    const programme = _.parseInt(splitLine[0]);
    const links = _.map(_.slice(splitLine, 2), part => _.parseInt(part.replace(/,/, '')));
    return { programme, links };
}

interface communicationLinks {
    programme: number,
    links: number[]
}