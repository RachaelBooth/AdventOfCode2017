import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 7;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const programmes = addWeights(_.map(input, line => transformLine(line)));
    return findCorrectWeightForMisbalanced(programmes).toString();
}

function findCorrectWeightForMisbalanced(programmes: programme[]): number {
    const misweighted = findMisweighted(programmes);
    const topUnbalanced = _.find(programmes, p => p.supporting.includes(misweighted.name));
    const supportedProgrammes = _.filter(programmes, programme => _.includes(topUnbalanced.supporting, programme.name));
    console.log(_.map(supportedProgrammes, p => p.totalWeight));
    console.log(_.map(supportedProgrammes, p => p.weight));
    const values = _.countBy(supportedProgrammes, s => s.totalWeight);
    // Just do this by eye from above - maybe code it up later
    return 0;
}

function findMisweighted(programmes: programme[]): programme {
    return _.find(programmes, programme => {
        if (!isBalanced(programme, programmes)) return false;

        let programmeSupporting = _.find(programmes, p => p.supporting.includes(programme.name));
        if (programmeSupporting == null) return false;

        return !isBalanced(programmeSupporting, programmes);
    });
}

function isBalanced(programme: programme, programmes: programme[]): boolean {
    if (programme.supporting.length === 0) {
        return true;
    }
    return _.uniq(_.map(programme.supporting, pr => {
        let supportedProgramme = _.find(programmes, p => p.name === pr);
        return supportedProgramme.totalWeight;
    })).length <= 1;
}

function addWeights(programmes: programme[]): programme[] {
    return _.map(programmes, programme => {
        programme.totalWeight = findTotalWeight(programme, programmes);
        return programme;
    });
}

function findTotalWeight(programme: programme, programmes: programme[]): number {
    if (programme.totalWeight != null) {
        return programme.totalWeight;
    }
    let weight = programme.weight;
    _.forEach(programme.supporting, p => {
        weight = weight + findTotalWeight(_.find(programmes, pr => pr.name === p), programmes);
    });
    return weight;
}

function transformLine(line: string): programme {
    const splitLine = line.split(/[- ()>,]+/);
    return {
        name: splitLine[0],
        weight: _.parseInt(splitLine[1]),
        supporting: _.filter(_.slice(splitLine, 2), n => n !== '')
    }
}

interface programme {
    name: string,
    weight: number,
    supporting: string[],
    totalWeight?: number,
}