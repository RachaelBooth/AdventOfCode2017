import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 24;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const components: [number, number][] = _.map(input, line => parseComponent(line));
    return getBest(0, { length: 0, strength: 0 } , components).strength.toString();
}

// N.B. Looks like input doesn't contain duplicates, which is nice

function getBest(connector: number, current: bridgeDetail, remainingComponents: [number, number][]): bridgeDetail {
    const available = _.filter(remainingComponents, component => {
        return component[0] === connector || component[1] === connector;
    });

    if (available.length === 0) {
        return current;
    }

    const potentials = _.map(available, component => {
        let nextConnector = component[0] === connector ? component[1] : component[0];
        let nextRemainingComponents = _.filter(remainingComponents, comp => comp !== component);
        let strength = current.strength + component[0] + component[1];
        let length = current.length + 1;
        return getBest(nextConnector, { length, strength }, nextRemainingComponents);
    });

    return _.orderBy(potentials, ['length', 'strength'], ['desc', 'desc'])[0];
}

function parseComponent(line: string): [number, number] {
    const ports = line.split('/');
    return [_.parseInt(ports[0]), _.parseInt(ports[1])];
}

interface bridgeDetail {
    length: number,
    strength: number
}
