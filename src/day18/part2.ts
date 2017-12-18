import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 18;
const inputParser = new InputParser(day);

let registers0 = { p: 0 };
let registers1 = { p: 1 };
let queueFor1 = [];
let queueFor0 = [];
let index0 = 0;
let index1 = 0;
let isBlocked0 = false;
let isBlocked1 = false;
let isStopped0 = false;
let isStopped1 = false;

let timesP1Sent = 0;

let instructions: string[][];

export function solve(): string {
    instructions = inputParser.readLinesAsWordArrays();
    while (true) {
        runProgramme0();
        runProgramme1();
        if (queueFor0.length === 0 || (isStopped0 && isStopped1)) {
            break;
        }
    }
    return timesP1Sent.toString();
}

function runProgramme0(): void {
    if (isStopped0) {
        return;
    }

    isBlocked0 = false;
    while (!isBlocked0) {
        let instruction = instructions[index0];
        switch (instruction[0]) {
            case 'snd':
                queueFor1.push(getValue(instruction[1], registers0));
                index0 = index0 + 1;
                break;
            case 'set':
                registers0[instruction[1]] = getValue(instruction[2], registers0);
                index0 = index0 + 1;
                break;
            case 'add':
                registers0[instruction[1]] = registers0[instruction[1]] + getValue(instruction[2], registers0);
                index0 = index0 + 1;
                break;
            case 'mul':
                registers0[instruction[1]] = registers0[instruction[1]] * getValue(instruction[2], registers0);
                index0 = index0 + 1;
                break;
            case 'mod':
                registers0[instruction[1]] = registers0[instruction[1]] % getValue(instruction[2], registers0);
                index0 = index0 + 1;
                break;
            case 'rcv':
                if (queueFor0.length > 0) {
                    registers0[instruction[1]] = _.pullAt(queueFor0, [0])[0];
                    index0 = index0 + 1;
                } else {
                    isBlocked0 = true;
                }
                break;
            case 'jgz':
                if (getValue(instruction[1], registers0) > 0) {
                    index0 = index0 + getValue(instruction[2], registers0);
                } else {
                    index0 = index0 + 1;
                }
                break;
        }
        if (index0 < 0 || index0 >= instructions.length) {
            isStopped0 = true;
            isBlocked0 = true;
        }
    }
}

function runProgramme1(): void {
    if (isStopped1) {
        return;
    }

    isBlocked1 = false;
    while (!isBlocked1) {
        let instruction = instructions[index1];
        switch (instruction[0]) {
            case 'snd':
                queueFor0.push(getValue(instruction[1], registers1));
                timesP1Sent = timesP1Sent + 1;
                index1 = index1 + 1;
                break;
            case 'set':
                registers1[instruction[1]] = getValue(instruction[2], registers1);
                index1 = index1 + 1;
                break;
            case 'add':
                registers1[instruction[1]] = registers1[instruction[1]] + getValue(instruction[2], registers1);
                index1 = index1 + 1;
                break;
            case 'mul':
                registers1[instruction[1]] = registers1[instruction[1]] * getValue(instruction[2], registers1);
                index1 = index1 + 1;
                break;
            case 'mod':
                registers1[instruction[1]] = registers1[instruction[1]] % getValue(instruction[2], registers1);
                index1 = index1 + 1;
                break;
            case 'rcv':
                if (queueFor1.length > 0) {
                    registers1[instruction[1]] = _.pullAt(queueFor1, [0])[0];
                    index1 = index1 + 1;
                } else {
                    isBlocked1 = true;
                }
                break;
            case 'jgz':
                if (getValue(instruction[1], registers1) > 0) {
                    index1 = index1 + getValue(instruction[2], registers1);
                } else {
                    index1 = index1 + 1;
                }
                break;
        }
        if (index1 < 0 || index1 >= instructions.length) {
            isStopped1 = true;
            isBlocked1 = true;
        }
    }
}

function getValue(registerOrValue: string, registers: object): number {
    if (registerOrValue.match(/[a-z]/)) {
        return getRegister(registerOrValue, registers);
    }

    return _.parseInt(registerOrValue);
}

function getRegister(name: string, registers: object): number {
    if (registers[name] != null) {
        return registers[name];
    }

    registers[name] = 0;
    return 0;
}