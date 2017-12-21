import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 21;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const rules = readRules(input);
    let pattern = '.#./..#/###';
    let iterations = 0;
    while (iterations < 18) {
        pattern = doIteration(pattern, rules);
        iterations = iterations + 1;
    }
    return _.filter(pattern.split(''), l => l === '#').length;
}

function doIteration(pattern: string, rules: object): string {
    let rows = pattern.split('/');
    if (rows.length % 2 === 0) {
        let i = 0;
        let sections = [];
        while (i < rows.length) {
            let s = [];
            let j = 0;
            while (j < rows[i].length) {
                s.push(rows[i][j] + rows[i][j + 1] + '/' + rows[i + 1][j] + rows[i + 1][j + 1]);
                j = j + 2;
            }
            sections.push(s);
            i = i + 2;
        }
        let enhanced = _.map(sections, line => _.map(line, l => getEnhanced(l, rules)));
        return _.flatMap(enhanced, largeRow => _.map(_.zip(..._.map(largeRow, r => r.split('/'))), t => t.join(''))).join('/');
    } else {
        let i = 0;
        let sections = [];
        while (i < rows.length) {
            let s = [];
            let j = 0;
            while (j < rows[i].length) {
                s.push(rows[i][j] + rows[i][j + 1] + rows[i][j + 2] + '/' + rows[i + 1][j] + rows[i + 1][j + 1] + rows[i + 1][j + 2] + '/' + rows[i + 2][j] + rows[i + 2][j + 1] + rows[i + 2][j + 2]);
                j = j + 3;
            }
            sections.push(s);
            i = i + 3;
        }
        let enhanced = _.map(sections, line => _.map(line, l => getEnhanced(l, rules)));
        return _.flatMap(enhanced, largeRow => _.map(_.zip(..._.map(largeRow, r => r.split('/'))), t => t.join(''))).join('/');
    }
}

function getEnhanced(section: string, rules: object): string {
    if (!rules[section]) {
        console.log('no rule found:');
        console.log(section);
    }
    return rules[section];
}

function readRules(input: string[]): object {
    let rules = {};
    _.forEach(input, line => {
        let parts = line.split(' => ');
        let group = getGroup(parts[0]);
        _.forEach(group, g => {
            rules[g] = parts[1];
        });
    });
    return rules;
}

function getGroup(grid: string): string[] {
    let s = [];
    let i = 0;
    let g = grid;
    while (i < 4) {
        s.push(g);
        s.push(flipGrid(g));
        g = rotateGrid(g);
        i++;
    }
    return s;
}

function rotateGrid(grid: string): string {
    let parts = grid.split('/');
    return _.reverse(_.map(_.zip(..._.map(parts, part => part.split(''))), r => r.join(''))).join('/');
}

function flipGrid(grid: string): string {
    let parts = grid.split('/');
    return _.reverse(parts).join('/');
}