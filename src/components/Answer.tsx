import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import Card from "../lib/card";
import { useToggle } from "../util/hooks.util";
import { makeStyles } from "../util/style.utils";
import Guess from "./Guess";

export const GUESSES = 5;

export type AnswerProps = React.PropsWithChildren<{
  answer: Card[];
  viewable: boolean;
}>;

const useStyles = makeStyles()((theme) => ({
  answerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "8px",
    padding: "4px 0",
  },
}));

const Answer: React.FunctionComponent<AnswerProps> = (
  props: AnswerProps
): JSX.Element => {
  const { classes } = useStyles();
  const [answerShown, toggleAnswerShown] = useToggle(false);

  return (
    <div className={classes.answerContainer}>
      <Guess guess={props.answer[0]} flipped={!answerShown} />
      <Guess guess={props.answer[1]} flipped={!answerShown} />
      <Guess guess={props.answer[2]} flipped={!answerShown} />
      <Guess guess={props.answer[3]} flipped={!answerShown} />
      <Guess guess={props.answer[4]} flipped={!answerShown} />
      <IconButton onClick={toggleAnswerShown} disabled={!props.viewable}>
        {answerShown ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </div>
  );
};

export default Answer;
