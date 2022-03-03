import { getSuit, getValue } from "../util/card.utils";

export const CARD_VALUES = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
] as const;
export type CardValue = typeof CARD_VALUES[number];

export const CARD_SUITS = ["club", "diamond", "heart", "spade"];
export type CardSuit = typeof CARD_SUITS[number];

class Card {
  private _index: number;
  private _value: CardValue;
  private _suit: CardSuit;

  constructor(index: number) {
    this._index = index;
    this._value = getValue(index);
    this._suit = getSuit(index);
  }

  public toString(): string {
    return `${this._value} of ${this._suit} (${this._index})`;
  }
}

export default Card;
