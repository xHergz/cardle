import { isNil } from "lodash";

import { GameMode } from "../components/GameModeOption";
import { GuessData } from "../components/Guess";
import { MAX_TRIES } from "../constants/rules";
import Card from "../lib/card";
import { getGuessEmojis } from "./card.utils";
import { getDailyNumber } from "./common.util";
import { getGameModeLabel } from "./game-mode.util";

export const createSharableResult = (
  gameMode: GameMode,
  answer: Card[],
  isCorrect: boolean,
  submissions: GuessData[][]
): string => {
  let text = "";
  const steps = isCorrect ? submissions.length : "X";
  if (gameMode === "daily") {
    text += `Shufle #${getDailyNumber()} ${steps}/${MAX_TRIES}\n`;
  } else {
    text += `Shufle ${getGameModeLabel(gameMode)} ${steps}/${MAX_TRIES}\n`;
  }

  for (let i = 0; i < submissions.length; i++) {
    if (isNil(submissions[i])) {
      break;
    } else {
      text += getGuessEmojis(submissions[i], answer).join("");
    }
    text += "\n";
  }

  return text;
};
