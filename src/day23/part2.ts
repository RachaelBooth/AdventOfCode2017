import * as _ from 'lodash';

export function solve(): string {
    return doTheSimplifiedThing(getPrimes()).toString();
}

function getPrimes(): number[] {
    let numbers = _.range(2, 196001);
    let nextIndex = 0;
    while (nextIndex < numbers.length - 1) {
        let p = numbers[nextIndex];
        numbers = _.filter(numbers, num => {
            return num <= p || num % p != 0;
        });
        nextIndex = nextIndex + 1;
    }
    return numbers;
}

function doTheSimplifiedThing(primes: number[]) {
    let bValues = _.range(107900, 107900 + 17001, 17);
    return _.difference(bValues, primes).length;
}


function doThing() {
    let a = 1;
    let b = 107900;
    let c = 107900 + 17000;
    let d = 0;
    let e = 0;
    let f = 0;
    let g = 0;
    let h = 0;
    // 9
    while (true) {
        f = 1
        d = 2
        // 11
        while (true) {
            e = 2
            while (true) {
                g = d
                g = g * e
                g = g - b
                // d * e - b
                if (g === 0) {
                    f = 0
                }
                e = e + 1
                g = e
                g = g - b
                // e + 1 - b
                if (g === 0) {
                    break;
                }
                // f = 0 if b is 0 mod d?
            }
            //21
            d = d + 1
            g = d
            g = g - b
            // (old) d + 1 - b
            if (g === 0) {
                break;
            }
            // f = 0 if b is not prime
        }
        if (f === 0) {
            h = h + 1
        }
        // 27
        g = b
        g = g - c
        // b - c
        if (g === 0) {
            return h;
        }
        b = b + 17
    }
}