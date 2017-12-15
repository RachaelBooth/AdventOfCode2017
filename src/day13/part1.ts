import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 13;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const firewall = getFirewall(input);
    let severity = 0;
    let depth = 0;
    while (depth < firewall.length) {
        if (isCaught(depth, firewall)) {
            severity = severity + getSeverity(depth, firewall);
        }
        depth++;
    }
    return severity.toString();
}

function getSeverity(depth: number, firewall: number[]): number {
    return depth * firewall[depth];
}

function isCaught(depth: number, firewall: number[]): boolean {
    if (firewall[depth] === 0) {
        return false;
    }
    return depth % (2 * firewall[depth] - 2) === 0;
}

function getFirewall(input: string[]): number[] {
    // Max depth in list is 98
    let firewall = _.range(99).map(el => 0);
    _.forEach(input, line => {
        let parts = line.split(": ");
        firewall[_.parseInt(parts[0])] = _.parseInt(parts[1]);
    });
    return firewall;
}