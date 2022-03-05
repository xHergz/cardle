import React from "react";
import clsx from "clsx";

import styles from "../../styles/Guess.module.css";
import { CardSuit, CardValue } from "../lib/card";
import { getSuitEmoji } from "../util/card.utils";
import { isNil } from "lodash";

export type GuessData = {
    value?: CardValue;
    suit?: CardSuit;
};

export type GuessStatus =
    | "guess"
    | "notFound"
    | "correctSuit"
    | "correctValue"
    | "wrongPosition"
    | "correct"
    | "error";

export type GuessProps = React.PropsWithChildren<{
    guess?: GuessData;
    status?: GuessStatus;
    active?: boolean;
}>;

const Guess: React.FunctionComponent<GuessProps> = (
    props: GuessProps
): JSX.Element => {
    const classes = clsx({
        [styles.guess]: true,
        [styles.notFound]: props.status === "notFound",
        [styles.correctSuit]: props.status === "correctSuit",
        [styles.correctValue]: props.status === "correctValue",
        [styles.wrongPosition]: props.status === "wrongPosition",
        [styles.correct]: props.status === "correct",
        [styles.error]: props.status === "error",
        [styles.activeGuess]: props.active,
    });

    const getLabel = (): string => {
        if (isNil(props.guess) || isNil(props.guess.value)) {
            return "";
        }
        switch (props.guess.value) {
            case "ace":
            case "king":
            case "queen":
            case "jack":
                return props.guess.value[0].toUpperCase();
            default:
                return props.guess.value;
        }
    };

    return (
        <div className={classes}>
            <div>{getLabel()}</div>
            <div>
                {!isNil(props.guess) && !isNil(props.guess.suit)
                    ? getSuitEmoji(props.guess.suit)
                    : null}
            </div>
        </div>
    );
};

export default Guess;
