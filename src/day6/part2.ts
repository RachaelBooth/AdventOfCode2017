import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 6;
const inputParser = new InputParser(day);

export function solve(): string {
    let banks = inputParser.readWholeInputAsNumberArrayOfWords();
    let arrangementsSeen = [banks.join()];
    while (true) {
        banks = doCycle(banks);
        if (_.includes(arrangementsSeen, banks.join())) {
            return (arrangementsSeen.length - _.findIndex(arrangementsSeen, arrangement => arrangement === banks.join())).toString();
        }
        arrangementsSeen = arrangementsSeen.concat(banks.join());
    }
}

function doCycle(banks: number[]): number[] {
    const max = _.max(banks);
    const bankToReallocate = _.findIndex(banks, bank => bank === max);
    banks[bankToReallocate] = 0;
    let blocksToRedistribute = max;
    let nextIndex = (bankToReallocate + 1) % banks.length;
    while (blocksToRedistribute > 0) {
        banks[nextIndex]++;
        nextIndex = (nextIndex + 1) % banks.length;
        blocksToRedistribute--;
    }
    return banks;
}