import CustomDialog, { CustomDailogProps } from "./CustomDialog";

import Extension from "@mui/icons-material/Extension";
import Share from "@mui/icons-material/Share";

import styles from "../../styles/StatisticsDialog.module.css";
import { GameMode } from "./GameModeOption";
import { Button, Typography } from "@mui/material";
import { getDailyNumber } from "../util/common.util";

export type StatisticsDialogProps = Pick<
  CustomDailogProps,
  "open" | "onClose"
> & {
  complete: boolean;
  mode: GameMode;
  onShare: () => void;
};

const StatisticsDialog: React.FunctionComponent<StatisticsDialogProps> = (
  props: StatisticsDialogProps
): JSX.Element => {
  return (
    <CustomDialog
      id="statistics"
      title="Statistics"
      open={props.open}
      onClose={props.onClose}
    >
      <>
        <div className={styles.statsContainer}>
          {props.mode === "daily" ? (
            <Typography>Cardle #{getDailyNumber()}</Typography>
          ) : null}
          <div className={styles.shareActions}>
            <Button
              variant="outlined"
              disabled
              startIcon={<Extension />}
              color="secondary"
            >
              Challenge
            </Button>
            <Button
              variant="contained"
              disabled={!props.complete}
              startIcon={<Share />}
              color="primary"
              onClick={props.onShare}
            >
              Share
            </Button>
          </div>
        </div>
      </>
    </CustomDialog>
  );
};

export default StatisticsDialog;
