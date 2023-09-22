import { Radio, Typography } from "@mui/material";
import clsx from "clsx";
import { isNil } from "lodash";
import React from "react";

import styles from "../../styles/GameModeOption.module.css";
import { getGameModeLabel } from "../util/game-mode.util";

export type GameMode = "daily" | "classic" | "hilo" | "unique" | "poker";

export type GameModeOptionProps = {
  value: GameMode;
  selected: GameMode;
  onChange: (newValue: GameMode) => void;
  comingSoon?: boolean;
  daily?: boolean;
  disabled?: boolean;
  replayable?: boolean;
};

const GameModeOption: React.FunctionComponent<GameModeOptionProps> = (
  props: GameModeOptionProps
): JSX.Element => {
  const comingSoonClasses = clsx({
    [styles.tag]: true,
    [styles.comingSoon]: true,
  });
  const replayableClasses = clsx({
    [styles.tag]: true,
    [styles.replayable]: true,
  });

  const dailyClasses = clsx({
    [styles.tag]: true,
    [styles.daily]: true,
  });

  const getDescription = (): string => {
    switch (props.value) {
      case "classic":
        return "The initial form of the game. Guess 5 totally random cards.";
      case "daily":
        return "A different puzzle daily that is the same for everybody.";
      case "hilo":
        return "The cards are sorted by value from highest to lowest.";
      case "poker":
        return "The cards always make up a poker hand.";
      case "unique":
        return "The cards always have a unique value (i.e. can't be 2 aces in the answer).";
      default:
        return "";
    }
  };

  const handleChange = (): void => {
    props.onChange(props.value);
  };

  return (
    <div className={styles.gameModeContainer}>
      <div className={styles.gameModeHeader}>
        <div className={styles.gameModeTitle}>
          <Radio
            onChange={handleChange}
            checked={props.selected === props.value}
            disabled={props.disabled}
          />
          <Typography
            variant="body1"
            color={props.disabled ? "GrayText" : "black"}
          >
            {getGameModeLabel(props.value)}
          </Typography>
        </div>
        <div className={styles.tagContainer}>
          {!isNil(props.comingSoon) ? (
            <Typography className={comingSoonClasses} variant="caption">
              COMING SOON
            </Typography>
          ) : null}
          {!isNil(props.daily) ? (
            <Typography className={dailyClasses} variant="caption">
              DAILY
            </Typography>
          ) : null}
          {!isNil(props.replayable) ? (
            <Typography className={replayableClasses} variant="caption">
              REPLAYABLE
            </Typography>
          ) : null}
        </div>
      </div>
      <Typography
        className={styles.gameModeDescription}
        variant="subtitle2"
        color={props.disabled ? "lightgray" : "gray"}
      >
        {getDescription()}
      </Typography>
    </div>
  );
};

export default GameModeOption;
