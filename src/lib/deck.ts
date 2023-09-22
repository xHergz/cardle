import { isNil, shuffle as lodashShuffle } from "lodash";
import { shuffle as seededShuffle } from "../util/common.util";

class Deck {
    private _deck: number[];

    constructor() {
        this._deck = Array.from(Array(52).keys());
    }

    public get size(): number {
        return this._deck.length;
    }

    public shuffle(seed?: number): void {
        if (isNil(seed)) {
            this._deck = lodashShuffle(this._deck);
        } else {
            this._deck = seededShuffle(this._deck, seed);
        }
    }

    public deal(amount: number): number[] {
        return this._deck.splice(0, amount);
    }
}

export default Deck;
