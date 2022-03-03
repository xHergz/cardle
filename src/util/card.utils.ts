import { CardSuit, CardValue, CARD_SUITS, CARD_VALUES } from "../lib/card";

export const getValue = (index: number): CardValue => {
  return CARD_VALUES[index % 13];
};

export const getSuit = (index: number): CardSuit => {
  return CARD_SUITS[index % 4];
};
