import { isNil } from "lodash";
import React from "react";

import styles from "../../styles/Guess.module.css";
import Card from "../lib/card";
import Guess, { GuessData, GuessStatus } from "./Guess";

export const GUESSES = 5;

export type GuessGroupProps = React.PropsWithChildren<{
  answer: Card[];
  guesses: GuessData[];
  submitted: boolean;
  currentGuess: number;
  active: boolean;
}>;

const GuessGroup: React.FunctionComponent<GuessGroupProps> = (
  props: GuessGroupProps
): JSX.Element => {
  const getStatus = (index: number): GuessStatus => {
    const guess = props.guesses[index];
    const card = props.answer[index];

    if (isNil(guess) || !props.submitted) {
      return "guess";
    } else if (isNil(card)) {
      return "error";
    }

    const matchIndex = props.answer.findIndex(
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
  };

  return (
    <div className={styles.guessGroup}>
      <Guess
        guess={props.guesses[0]}
        status={getStatus(0)}
        active={props.active && props.currentGuess === 0}
      />
      <Guess
        guess={props.guesses[1]}
        status={getStatus(1)}
        active={props.active && props.currentGuess === 1}
      />
      <Guess
        guess={props.guesses[2]}
        status={getStatus(2)}
        active={props.active && props.currentGuess === 2}
      />
      <Guess
        guess={props.guesses[3]}
        status={getStatus(3)}
        active={props.active && props.currentGuess === 3}
      />
      <Guess
        guess={props.guesses[4]}
        status={getStatus(4)}
        active={props.active && props.currentGuess === 4}
      />
    </div>
  );
};

export default GuessGroup;
