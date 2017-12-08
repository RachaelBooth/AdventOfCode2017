import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 8;
const inputParser = new InputParser(day);

let registers: { [register: string]: number } = {};

export function solve(): string {
    const instructions = inputParser.readInputLines();
    _.forEach(instructions, instruction => followInstruction(instruction))
    return _.max(_.values(registers));
}

function followInstruction(instructionLine: string): void {
    const instruction = parseInstruction(instructionLine);
    if (registers[instruction.register] == null) registers[instruction.register] = 0;
    if (checkCondition(instruction.condition)) {
        registers[instruction.register] = registers[instruction.register] + instruction.change;
    }
}

function checkCondition(condition: condition): boolean {
    if (registers[condition.register] == null) registers[condition.register] = 0;

    if (condition.comparator === '>') return registers[condition.register] > condition.value;
    if (condition.comparator === '<') return registers[condition.register] < condition.value;
    if (condition.comparator === ">=") return registers[condition.register] >= condition.value;
    if (condition.comparator === "<=") return registers[condition.register] <= condition.value;
    if (condition.comparator === "==") return registers[condition.register] === condition.value;
    if (condition.comparator === "!=") return registers[condition.register] !== condition.value;

    console.log(`comparator ${condition.comparator} unrecognised`);
    return false;
}

function parseInstruction(line: string): instruction {
    const parts = line.split(' ');
    return {
        register: parts[0],
        change: getRegisterChange(parts[1], parts[2]),
        condition: getCondition(parts[4], parts[5], parts[6])
    }
}

function getRegisterChange(direction: string, amount: string): number {
    if (direction === 'inc') {
        return _.parseInt(amount);
    }
    return - _.parseInt(amount);
}

function getCondition(register: string, comparator: string, value: string): condition {
    return {
        register: register,
        comparator: comparator,
        value: _.parseInt(value)
    }
}

interface instruction {
    register: string,
    change: number,
    condition: condition
}

interface condition {
    register: string,
    comparator: string,
    value: number
}