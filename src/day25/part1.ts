import * as _ from 'lodash';

enum state {
    A, B, C, D, E, F
}

let currentState: state = state.A;
let currentLocation: number = 0;
let tape = {};

export function solve(): string {
    let steps = 0;
    while (steps < 12368930) {
        doStep();
        steps = steps + 1;
    }
    return getChecksum().toString();
}

function getChecksum(): number {
    return _.sum(_.values(tape));
}

function doStep(): void {
    switch (currentState) {
        case state.A:
            if (getTapeValue(currentLocation) === 0) {
                tape[currentLocation] = 1;
                currentLocation = currentLocation + 1;
                currentState = state.B;
                return;
            } else {
                tape[currentLocation] = 0;
                currentLocation = currentLocation + 1;
                currentState = state.C;
                return;
            }
        case state.B:
            if (getTapeValue(currentLocation) === 0) {
                currentLocation = currentLocation - 1;
                currentState = state.A;
                return;
            } else {
                tape[currentLocation] = 0;
                currentLocation = currentLocation + 1;
                currentState = state.D;
                return;
            }
        case state.C:
            if (getTapeValue(currentLocation) === 0) {
                tape[currentLocation] = 1;
                currentLocation = currentLocation + 1;
                currentState = state.D;
                return;
            } else {
                currentLocation = currentLocation + 1;
                currentState = state.A;
                return;
            }
        case state.D:
            if (getTapeValue(currentLocation) === 0) {
                tape[currentLocation] = 1;
                currentLocation = currentLocation - 1;
                currentState = state.E;
                return;
            } else {
                tape[currentLocation] = 0;
                currentLocation = currentLocation - 1;
                currentState = state.D;
                return;
            }
        case state.E:
            if (getTapeValue(currentLocation) === 0) {
                tape[currentLocation] = 1;
                currentLocation = currentLocation + 1;
                currentState = state.F;
                return;
            } else {
                currentLocation = currentLocation - 1;
                currentState = state.B;
                return;
            }
        case state.F:
            if (getTapeValue(currentLocation) === 0) {
                tape[currentLocation] = 1;
                currentLocation = currentLocation + 1;
                currentState = state.A;
                return;
            } else {
                currentLocation = currentLocation + 1;
                currentState = state.E;
                return;
            }
    }
}

function getTapeValue(index: number): number {
    if (!tape[index]) {
        tape[index] = 0;
    }

    return tape[index];
}
