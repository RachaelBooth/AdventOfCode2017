import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 22;
const inputParser = new InputParser(day);

enum direction {
    up,
    right,
    down,
    left
}

let grid: number[][];
// Input grid is 25 by 25
let virus: virus = { x: 12, y: 12, direction: direction.up };

export function solve(): string {
    const input = inputParser.readInputLines();
    grid = parseGrid(input);
    let burstsCausingInfection = 0;
    let bursts = 0;
    while (bursts < 10000) {
        ensureCurrentNode();
        if (currentNodeIsInfected()) {
            turnRight();
            cleanCurrentNode();
        } else {
            turnLeft();
            infectCurrentNode();
            burstsCausingInfection = burstsCausingInfection + 1;
        }
        moveVirusCarrier();
        bursts++;
    }
    return burstsCausingInfection.toString();
}

function moveVirusCarrier() {
    switch (virus.direction) {
        case direction.up:
            virus.x = virus.x - 1;
            break;
        case direction.right:
            virus.y = virus.y + 1;
            break;
        case direction.down:
            virus.x = virus.x + 1;
            break;
        case direction.left:
            virus.y = virus.y - 1;
            break;
    }
}

function cleanCurrentNode() {
    grid[virus.x][virus.y] = 0;
}

function infectCurrentNode() {
    grid[virus.x][virus.y] = 1;
}

function turnRight() {
    switch (virus.direction) {
        case direction.up:
            virus.direction = direction.right;
            break;
        case direction.right:
            virus.direction = direction.down;
            break;
        case direction.down:
            virus.direction = direction.left;
            break;
        case direction.left:
            virus.direction = direction.up;
            break;
    }
}

function turnLeft() {
    switch (virus.direction) {
        case direction.up:
            virus.direction = direction.left;
            break;
        case direction.left:
            virus.direction = direction.down;
            break;
        case direction.down:
            virus.direction = direction.right;
            break;
        case direction.right:
            virus.direction = direction.up;
            break;
    }
}

function currentNodeIsInfected(): boolean {
    return grid[virus.x][virus.y] === 1;
}

function ensureCurrentNode(): void {
    if (!grid[virus.x]) {
        grid[virus.x] = _.map(_.range(25), i => 0);
    }

    if (!grid[virus.x][virus.y]) {
        grid[virus.x][virus.y] = 0;
    }
}

function parseGrid(lines: string[]): number[][] {
    return _.map(lines, line => {
        return _.map(line.split(''), c => {
            if (c === '.' ) {
                return 0;
            } else {
                return 1;
            }
        });
    });
}

interface virus {
    x: number,
    y: number,
    direction: direction
}
