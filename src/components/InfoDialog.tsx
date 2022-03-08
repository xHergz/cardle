import { Typography } from "@mui/material";

import CustomDialog, { CustomDailogProps } from "./CustomDialog";

import styles from "../../styles/InfoDialog.module.css";
import { SQAURE_EMOJIS } from "../constants/emoji";

export type InfoDialogProps = Pick<CustomDailogProps, "open" | "onClose">;

const InfoDialog: React.FunctionComponent<InfoDialogProps> = (
  props: InfoDialogProps
): JSX.Element => {
  return (
    <CustomDialog
      id="info"
      title="How to Play"
      open={props.open}
      onClose={props.onClose}
    >
      <>
        <Typography variant="body1">
          <strong>Objective:</strong>
        </Typography>
        <Typography variant="body1">
          Correctly guess the 5 random cards. You get 6 guesses and will receive
          different information after each guess.
        </Typography>
        <div className={styles.legendContainer}>
          <Typography variant="body1">
            <strong>Legend:</strong>
          </Typography>
          <div className={styles.legendValues}>
            <Typography variant="body1">
              {SQAURE_EMOJIS.PURPLE} = Correct suit, wrong value
            </Typography>
            <Typography variant="body1">
              {SQAURE_EMOJIS.BLUE} = Correct value, wrong suit
            </Typography>
            <Typography variant="body1">
              {SQAURE_EMOJIS.YELLOW} = Correct value and suit, wrong position
            </Typography>
            <Typography variant="body1">
              {SQAURE_EMOJIS.GREEN} = Correct value
            </Typography>
          </div>
        </div>
      </>
    </CustomDialog>
  );
};

export default InfoDialog;
