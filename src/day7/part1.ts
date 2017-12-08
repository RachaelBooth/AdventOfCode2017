import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 7;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const programmes = _.map(input, line => transformLine(line));
    return getBottom(programmes);
}

function getBottom(programmes: programme[]): string {
    const supported = _.uniq(_.flatMap(programmes, programme => programme.supporting));
    return _.difference(_.map(programmes, programme => programme.name), supported)[0];
}

function transformLine(line: string): programme {
    const splitLine = line.split(/[- ()>,]+/);
    return {
        name: splitLine[0],
        weight: _.parseInt(splitLine[1]),
        supporting: _.slice(splitLine, 2)
    };
}

interface programme {
    name: string,
    weight: number,
    supporting: string[]
}