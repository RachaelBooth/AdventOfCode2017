import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 23;
const inputParser = new InputParser(day);

let registers = {};

export function solve(): string {
    const input = inputParser.readLinesAsWordArrays();
    return runProgramme(input).toString();
}

function runProgramme(instructions: string[][]): number {
    let index = 0;
    let mulExecuted = 0;
    while (index >= 0 && index < instructions.length) {
        let instruction = instructions[index];
        switch (instruction[0]) {
            case 'set':
                registers[instruction[1]] = getValue(instruction[2]);
                index = index + 1;
                break;
            case 'sub':
                registers[instruction[1]] = registers[instruction[1]] - getValue(instruction[2]);
                index = index + 1;
                break;
            case 'mul':
                mulExecuted = mulExecuted + 1;
                registers[instruction[1]] = registers[instruction[1]] * getValue(instruction[2]);
                index = index + 1;
                break;
            case 'jnz':
                if (getValue(instruction[1]) !== 0) {
                    index = index + getValue(instruction[2]);
                } else {
                    index = index + 1;
                }
                break;
        }
    }
    return mulExecuted;
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