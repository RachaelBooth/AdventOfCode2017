import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 18;
const inputParser = new InputParser(day);

let registers = {};

export function solve(): string {
    const input = inputParser.readLinesAsWordArrays();
    return runProgramme(input).toString();
}

function runProgramme(instructions: string[][]): number {
    let index = 0;
    let lastPlayed = null;
    while (index >= 0) {
        let instruction = instructions[index];
        switch (instruction[0]) {
            case 'snd':
                lastPlayed = getValue(instruction[1]);
                index = index + 1;
                break;
            case 'set':
                registers[instruction[1]] = getValue(instruction[2]);
                index = index + 1;
                break;
            case 'add':
                registers[instruction[1]] = registers[instruction[1]] + getValue(instruction[2]);
                index = index + 1;
                break;
            case 'mul':
                registers[instruction[1]] = registers[instruction[1]] * getValue(instruction[2]);
                index = index + 1;
                break;
            case 'mod':
                registers[instruction[1]] = registers[instruction[1]] % getValue(instruction[2]);
                index = index + 1;
                break;
            case 'rcv':
                if (getValue(instruction[1]) !== 0) {
                    index = -1;
                } else {
                    index = index + 1;
                }
                break;
            case 'jgz':
                if (getValue(instruction[1]) > 0) {
                    index = index + getValue(instruction[2]);
                } else {
                    index = index + 1;
                }
                break;
        }
    }
    return lastPlayed;
}

function getValue(registerOrValue: string): number {
    if (registerOrValue.match(/[a-z]/)) {
        return getRegister(registerOrValue);
    }

    return _.parseInt(registerOrValue);
}

function getRegister(name: string): number {
    if (registers[name] != null) {
        return registers[name];
    }

    registers[name] = 0;
    return 0;
}

function setRegister(name: string, value: number): void {
    registers[name] = value;
}