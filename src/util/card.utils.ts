import { GuessData, GuessStatus } from "../components/Guess";
import { GUESSES } from "../components/GuessGroup";
import { SQAURE_EMOJIS } from "../constants/emoji";
import Card, {
  CardSuit,
  CardValue,
  CARD_SUITS,
  CARD_VALUES,
} from "../lib/card";

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
      return "\u2666";
    case "heart":
      return "\u2665";
    case "spade":
      return "\u2660";
    default:
      return "\uD83C\uDCCF";
  }
};

export const isCorrectAnswer = (
  guesses: GuessData[],
  answer: Card[]
): boolean => {
  if (guesses.length !== answer.length) {
    return false;
  }
  let correct = true;
  for (let i = 0; i < guesses.length; i++) {
    if (
      guesses[i].suit !== answer[i].suit ||
      guesses[i].value !== answer[i].value
    ) {
      correct = false;
      break;
    }
  }
  return correct;
};

export const getGuessStatuses = (
  guesses: GuessData[],
  answer: Card[]
): GuessStatus[] => {
  return guesses.map((guess, index) => {
    const card = answer[index];
    const matchIndex = answer.findIndex(
      (card) => card.suit === guess.suit && card.value === guess.value
    );
    if (matchIndex === index) {
      return "correct";
    } else if (matchIndex !== -1) {
      return "wrongPosition";
    } else if (guess.suit === card.suit) {
      return "correctSuit";
    } else if (guess.value === card.value) {
      return "correctValue";
    }
    return "notFound";
  });
};

export const getEmojiStatuses = (statuses: GuessStatus[]): string[] => {
  return statuses.map((status) => getStatusEmoji(status));
};

export const getStatusEmoji = (status: GuessStatus): string => {
  switch (status) {
    case "correct":
      return SQAURE_EMOJIS.GREEN;
    case "correctSuit":
      return SQAURE_EMOJIS.PURPLE;
    case "correctValue":
      return SQAURE_EMOJIS.BLUE;
    case "wrongPosition":
      return SQAURE_EMOJIS.YELLOW;
    default:
      return SQAURE_EMOJIS.WHITE;
  }
};

export const getGuessEmojis = (
  guesses: GuessData[],
  answer: Card[]
): string[] => {
  return getEmojiStatuses(getGuessStatuses(guesses, answer));
};

export const getBlankGuessEmojis = (): string[] => {
  return new Array(GUESSES).fill(SQAURE_EMOJIS.WHITE);
};
