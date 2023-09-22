import CustomDialog, { CustomDailogProps } from "./CustomDialog";

import styles from "../../styles/OptionsDialog.module.css";
import { Typography } from "@mui/material";
import GameModeOption, { GameMode } from "./GameModeOption";

export type OptionsDialogProps = Pick<CustomDailogProps, "open" | "onClose"> & {
  currentMode: GameMode;
  onChangeGameMode: (newMode: GameMode) => void;
};

const OptionsDialog: React.FunctionComponent<OptionsDialogProps> = (
  props: OptionsDialogProps
): JSX.Element => {
  return (
    <CustomDialog
      id="options"
      title="Options"
      open={props.open}
      onClose={props.onClose}
    >
      <>
        <Typography variant="body1">
          <strong>Game Mode:</strong>
        </Typography>
        <GameModeOption
          value="daily"
          selected={props.currentMode}
          onChange={props.onChangeGameMode}
          daily
        />
        <GameModeOption
          value="classic"
          selected={props.currentMode}
          onChange={props.onChangeGameMode}
          replayable
        />
        <GameModeOption
          value="hilo"
          selected={props.currentMode}
          onChange={props.onChangeGameMode}
          disabled
          comingSoon
        />
        <GameModeOption
          value="unique"
          selected={props.currentMode}
          onChange={props.onChangeGameMode}
          disabled
          comingSoon
        />
        <GameModeOption
          value="poker"
          selected={props.currentMode}
          onChange={props.onChangeGameMode}
          disabled
          comingSoon
        />
      </>
    </CustomDialog>
  );
};

export default OptionsDialog;
