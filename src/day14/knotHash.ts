import * as _ from 'lodash';

export default class KnotHash {
    private list = _.range(256);
    private currentPosition = 0;
    private skipSize = 0;

    public getKnotHash(input: string): string {
        const lengths = _.map(input, c => c.charCodeAt()).concat([17, 31, 73, 47, 23]);
        this.doRounds(lengths);
        let denseHash = this.getDenseHash();
        return this.getHash(denseHash);
    }

    private getHash(denseHash: number[]): string {
        return _.join(_.map(denseHash, el => this.getHex(el)), '');
    }

    private getHex(number: number): string {
        let hexRep = number.toString(16);
        if (hexRep.length < 2) {
            hexRep = '0' + hexRep;
        }
        return hexRep;
    }

    private getDenseHash(): number[] {
        return _.range(16).map(i => i * 16).map(index => this.xorBlock(_.slice(this.list, index, index + 16)));
    }

    private xorBlock(block: number[]): number {
        let answer = block[0];
        let i = 1;
        while (i < 16) {
            answer = answer ^ block[i];
            i++;
        }
        return answer;
    }

    private doRounds(lengths: number[]): void {
        let steps = 0;
        while (steps < 64) {
            this.doRound(lengths);
            steps++;
        }
    }

    private doRound(lengths: number[]): void {
        _.forEach(lengths, length => this.doStep(length));
    }

    private doStep(length: number): void {
        if (this.currentPosition + length <= 256) {
            const indicesToRemove = _.range(this.currentPosition, this.currentPosition + length);
            const removedElements = _.pullAt(this.list, indicesToRemove);
            const listBefore = _.slice(this.list, 0, this.currentPosition);
            const listAfter = _.slice(this.list, this.currentPosition);
            this.list = listBefore.concat(_.reverse(removedElements)).concat(listAfter);
        } else {
            const endIndicesToRemove = _.range(this.currentPosition, 256);
            const numberWrapped = this.currentPosition + length - 256;
            const startIndicesToRemove = _.range(0, numberWrapped);
            const removedElements = _.pullAt(this.list, endIndicesToRemove).concat(_.pullAt(this.list, startIndicesToRemove));
            const elementsToInsert = _.reverse(removedElements);
            this.list = _.slice(elementsToInsert, length - numberWrapped).concat(this.list).concat(_.slice(elementsToInsert, 0, length - numberWrapped));
        }
        this.currentPosition = (this.currentPosition + length + this.skipSize) % 256;
        this.skipSize = this.skipSize + 1;
    }

}
