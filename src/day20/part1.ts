import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 20;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readInputLines();
    const particles = _.map(input, (line, index) => parseLine(line, index));
    const minAcceleration = _.min(_.map(particles, p => getAccelerationMod(p)));
    let smallestAccelerationParticles = _.filter(particles, p => getAccelerationMod(p) === minAcceleration);

    if (smallestAccelerationParticles.length === 1) {
        return smallestAccelerationParticles[0].name;
    }

    let s = 0;
    const probablyLongEnough = 10000;
    while (s < probablyLongEnough) {
        smallestAccelerationParticles = _.map(smallestAccelerationParticles, particle => doStep(particle));
        s++;
    }

    return _.minBy(smallestAccelerationParticles, p => getDistanceFromZero(p)).name;
}

function doStep(particle: particle): particle {
    return {
        name: particle.name,
        position: getNewPosition(particle),
        velocity: getNewVelocity(particle),
        accelleration: particle.accelleration
    }
}

function getNewPosition(particle: particle): [number, number, number] {
    return [
        particle.position[0] + particle.velocity[0] + particle.accelleration[0],
        particle.position[1] + particle.velocity[1] + particle.accelleration[1],
        particle.position[2] + particle.velocity[2] + particle.accelleration[2]
    ]
}

function getNewVelocity(particle: particle): [number, number, number] {
    return [
        particle.velocity[0] + particle.accelleration[0],
        particle.velocity[1] + particle.accelleration[1],
        particle.velocity[2] + particle.accelleration[2]
    ]
}

function getDistanceFromZero(particle: particle): number {
    return Math.abs(particle.position[0]) + Math.abs(particle.position[1]) + Math.abs(particle.position[2]);
}

function getAccelerationMod(particle: particle): number {
    return Math.abs(particle.accelleration[0]) + Math.abs(particle.accelleration[1]) + Math.abs(particle.accelleration[2]);
}

function parseLine(line: string, index: number): particle {
    const parts = line.split(', ');
    return {
        name: index,
        position: parsePart(parts[0]),
        velocity: parsePart(parts[1]),
        accelleration: parsePart(parts[2])
    }
}

function parsePart(part: string): [number, number, number] {
    const elements = part.substring(3, part.length - 1).split(',');
    return [_.parseInt(elements[0]), _.parseInt(elements[1]), _.parseInt(elements[2])];
}

interface particle {
    name: number,
    position: [number, number, number],
    velocity: [number, number, number],
    accelleration: [number, number, number]
}
