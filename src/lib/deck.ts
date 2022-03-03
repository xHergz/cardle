import { shuffle } from "lodash";

class Deck {
  private _deck: number[];

  constructor(shuffled: boolean = false) {
    this._deck = Array.from(Array(52).keys());
    if (shuffled) {
      this.shuffle();
    }
  }

  public get size(): number {
    return this._deck.length;
  }

  public shuffle(): void {
    this._deck = shuffle(this._deck);
  }

  public deal(amount: number): number[] {
    return this._deck.splice(0, amount);
  }
}

export default Deck;
