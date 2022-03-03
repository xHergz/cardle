import { CardSuit, CardValue, CARD_SUITS, CARD_VALUES } from "../lib/card";

export const getValue = (index: number): CardValue => {
    return CARD_VALUES[index % 13];
};

export const getSuit = (index: number): CardSuit => {
    return CARD_SUITS[index % 4];
};

export const getSuitEmoji = (suit: CardSuit): string => {
    switch (suit) {
        case "club":
            return "\u2663";
        case "diamond":
            return "\u2665";
        case "heart":
            return "\u2666";
        case "spade":
            return "\u2660";
        default:
            return "\u1F0CF";
    }
};
