import CustomDialog, { CustomDailogProps } from "./CustomDialog";

import Extension from "@mui/icons-material/Extension";
import Share from "@mui/icons-material/Share";

import { GameMode } from "./GameModeOption";
import { Button, Typography } from "@mui/material";
import { getDailyNumber, getStartOfUtcDay } from "../util/common.util";
import { makeStyles, withStyles } from "../util/style.utils";
import Card from "../lib/card";
import GuessGroup from "./GuessGroup";
import Answer from "./Answer";
import {
  addDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatDuration,
  intervalToDuration,
  Duration,
  differenceInMilliseconds,
  secondsToHours,
  secondsToMinutes,
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
} from "date-fns";
import { useEffect, useState } from "react";

export type StatisticsDialogProps = Pick<
  CustomDailogProps,
  "open" | "onClose"
> & {
  complete: boolean;
  mode: GameMode;
  answer: Card[];
  onShare: () => void;
};

const useStyles = makeStyles()((theme) => ({
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  shareActions: {
    justifySelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "8px",
    marginTop: "16px",
  },
}));

const StatisticsDialog: React.FunctionComponent<StatisticsDialogProps> = (
  props: StatisticsDialogProps
): JSX.Element => {
  const { classes } = useStyles();
  const [timeUntilNextDaily, setTimeUntilNextDaily] = useState<number>(
    differenceInMilliseconds(
      getStartOfUtcDay(addDays(new Date(), 1)),
      new Date().valueOf()
    )
  );

  useEffect(() => {
    if (timeUntilNextDaily <= 0) {
      return;
    }
    const timer = setTimeout(() => {
      setTimeUntilNextDaily(timeUntilNextDaily - 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeUntilNextDaily, setTimeUntilNextDaily]);

  const formatRemaining = (): string => {
    if (timeUntilNextDaily <= 0) {
      return "00:00:00";
    }
    const hours = millisecondsToHours(timeUntilNextDaily)
      .toString()
      .padStart(2, "0");
    const minutes = (millisecondsToMinutes(timeUntilNextDaily) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = (millisecondsToSeconds(timeUntilNextDaily) % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <CustomDialog
      id="statistics"
      title="Statistics"
      open={props.open}
      onClose={props.onClose}
    >
      <>
        <div className={classes.statsContainer}>
          {props.mode === "daily" ? (
            <Typography variant="h6" align="center">
              Shufle #{getDailyNumber()}
            </Typography>
          ) : null}
          {props.mode === "daily" ? (
            <Typography variant="body1" align="center">
              Next Daily: {formatRemaining()}
            </Typography>
          ) : null}
          <Answer answer={props.answer} viewable={props.complete} />
          <div className={classes.shareActions}>
            <ShareButton
              variant="outlined"
              disabled
              startIcon={<Extension />}
              color="secondary"
            >
              Challenge
            </ShareButton>
            <ShareButton
              variant="contained"
              disabled={!props.complete}
              startIcon={<Share />}
              color="primary"
              onClick={props.onShare}
            >
              Share
            </ShareButton>
          </div>
        </div>
      </>
    </CustomDialog>
  );
};

const ShareButton = withStyles(Button, (theme) => ({
  root: {
    flex: 1,
  },
}));

export default StatisticsDialog;
