import { Typography } from "@mui/material";

import CustomDialog, { CustomDailogProps } from "./CustomDialog";

import styles from "../../styles/InfoDialog.module.css";
import { SQAURE_EMOJIS } from "../constants/emoji";
import Autorenew from "@mui/icons-material/Autorenew";
import Casino from "@mui/icons-material/Casino";
import Info from "@mui/icons-material/Info";
import AutoGraph from "@mui/icons-material/AutoGraph";
import Settings from "@mui/icons-material/Settings";
import { makeStyles, withStyles } from "../util/style.utils";
import clsx from "clsx";

export type InfoDialogProps = Pick<CustomDailogProps, "open" | "onClose">;

const useStyles = makeStyles()((theme) => ({
  square: {
    display: "inline-flex",
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: "2px",
    height: "18px",
    width: "18px",
  },
  tipIcon: {
    marginRight: "4px",
  },
}));

const InfoDialog: React.FunctionComponent<InfoDialogProps> = (
  props: InfoDialogProps
): JSX.Element => {
  const { classes } = useStyles();
  const squareClasses = clsx({
    [classes.square]: true,
    [classes.tipIcon]: true,
  });
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
            <InfoTip>
              <PurpleSquare className={squareClasses} />{" "}
              <Typography variant="body1">
                = Correct suit, wrong value
              </Typography>
            </InfoTip>
            <InfoTip>
              <BlueSquare className={squareClasses} />{" "}
              <Typography variant="body1">
                = Correct value, wrong suit
              </Typography>
            </InfoTip>
            <InfoTip>
              <YellowSquare className={squareClasses} />{" "}
              <Typography variant="body1">
                = Correct value and suit, wrong position
              </Typography>
            </InfoTip>
            <InfoTip>
              <GreenSquare className={squareClasses} />{" "}
              <Typography variant="body1">= Correct value</Typography>
            </InfoTip>
          </div>
        </div>
        <Typography variant="body1">
          <strong>Buttons:</strong>
        </Typography>
        <InfoTip>
          <Autorenew className={classes.tipIcon} />
          <Typography variant="body1">= Reset the current game</Typography>
        </InfoTip>
        <InfoTip>
          <Casino className={classes.tipIcon} />
          <Typography variant="body1">= Redeal and reset</Typography>
        </InfoTip>
        <InfoTip>
          <Info className={classes.tipIcon} />
          <Typography variant="body1">= Game information</Typography>
        </InfoTip>
        <InfoTip>
          <AutoGraph className={classes.tipIcon} />
          <Typography variant="body1">= Statistics</Typography>
        </InfoTip>
        <InfoTip>
          <Settings className={classes.tipIcon} />
          <Typography variant="body1">= Options</Typography>
        </InfoTip>
      </>
    </CustomDialog>
  );
};

const InfoTip = withStyles("div", () => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
}));

const PurpleSquare = withStyles("div", () => ({
  root: {
    backgroundColor: "mediumorchid",
  },
}));

const BlueSquare = withStyles("div", () => ({
  root: {
    backgroundColor: "cadetblue",
  },
}));

const YellowSquare = withStyles("div", () => ({
  root: {
    backgroundColor: "darkkhaki",
  },
}));

const GreenSquare = withStyles("div", () => ({
  root: {
    backgroundColor: "forestgreen",
  },
}));

export default InfoDialog;
