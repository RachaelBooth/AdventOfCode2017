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

enum nodeState {
    clean,
    weakened,
    infected,
    flagged
}

let grid: nodeState[][];
// Input grid is 25 by 25
let virus: virus = { x: 12, y: 12, direction: direction.up };

export function solve(): string {
    const input = inputParser.readInputLines();
    grid = parseGrid(input);
    let burstsCausingInfection = 0;
    let bursts = 0;
    while (bursts < 10000000) {
        ensureCurrentNode();
        switch (getCurrentNodeState()) {
            case nodeState.clean:
                turnLeft();
                break;
            case nodeState.weakened:
                burstsCausingInfection = burstsCausingInfection + 1;
                break;
            case nodeState.infected:
                turnRight();
                break;
            case nodeState.flagged:
                reverseDirection();
                break;
        }
        updateCurrentNodeState();
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

function reverseDirection() {
    switch (virus.direction) {
        case direction.up:
            virus.direction = direction.down;
            break;
        case direction.down:
            virus.direction = direction.up;
            break;
        case direction.right:
            virus.direction = direction.left;
            break;
        case direction.left:
            virus.direction = direction.right;
            break;
    }
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

function getCurrentNodeState(): nodeState {
    return grid[virus.x][virus.y];
}

function updateCurrentNodeState(): void {
    grid[virus.x][virus.y] = nextNodeState(grid[virus.x][virus.y]);
}

function nextNodeState(current: nodeState): nodeState {
    switch (current) {
        case nodeState.clean:
            return nodeState.weakened;
        case nodeState.weakened:
            return nodeState.infected;
        case nodeState.infected:
            return nodeState.flagged;
        case nodeState.flagged:
            return nodeState.clean;
    }
}

function ensureCurrentNode(): void {
    if (!grid[virus.x]) {
        grid[virus.x] = _.map(_.range(25), i => nodeState.clean);
    }

    if (!grid[virus.x][virus.y]) {
        grid[virus.x][virus.y] = nodeState.clean;
    }
}

function parseGrid(lines: string[]): nodeState[][] {
    return _.map(lines, line => {
        return _.map(line.split(''), c => {
            if (c === '.' ) {
                return nodeState.clean;
            } else {
                return nodeState.infected;
            }
        });
    });
}

interface virus {
    x: number,
    y: number,
    direction: direction
}
