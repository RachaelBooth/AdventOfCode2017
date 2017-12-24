import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 24;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const components: [number, number][] = _.map(input, line => parseComponent(line));
    return getBest(0, 0, components).toString();
}

// N.B. Looks like input doesn't contain duplicates, which is nice

function getBest(connector: number, currentStrength: number, remainingComponents: [number, number][]): number {
    const available = _.filter(remainingComponents, component => {
        return component[0] === connector || component[1] === connector;
    });

    if (available.length === 0) {
        return currentStrength;
    }

    return _.max(_.map(available, component => {
        let nextConnector = component[0] === connector ? component[1] : component[0];
        let nextRemainingComponents = _.filter(remainingComponents, comp => comp !== component);
        let strength = currentStrength + component[0] + component[1];
        return getBest(nextConnector, strength, nextRemainingComponents);
    }));
}

function parseComponent(line: string): [number, number] {
    const ports = line.split('/');
    return [_.parseInt(ports[0]), _.parseInt(ports[1])];
}
