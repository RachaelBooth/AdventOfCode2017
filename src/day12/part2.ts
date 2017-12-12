import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 12;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const pipes = _.map(input, line => parseLine(line));
    let groups = 0;
    // 1999 is largest id in input
    let ungrouped = _.range(2000);
    let minUngrouped = 0;
    while (ungrouped.length > 0) {
        groups = groups + 1;
        ungrouped = _.difference(ungrouped, getGroup(ungrouped[0], pipes));
    }
    return groups.toString();
}

function getGroup(groupMin: number, pipes: communicationLinks[]): number[] {
    let copiedPipes = _.clone(pipes);
    let group = [groupMin];
    let oldLength = 0;
    while (group.length != oldLength) {
        oldLength = group.length;
        _.forEach(group, element => {
            const elementLinks: communicationLinks[] = _.remove(copiedPipes, l => l.programme === element);
            if (elementLinks.length > 0) {
                group.push(...elementLinks[0].links);
            }
            // N.B. each should only be once in input.
        });
        group = _.uniq(group);
    }
    return group;
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