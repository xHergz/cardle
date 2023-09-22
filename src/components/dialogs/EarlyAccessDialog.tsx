import { Button, Typography } from "@mui/material";

import { MAIN_SITE } from "../../constants/common";
import { COMMON_EMOJIS } from "../../constants/emoji";
import Analytics from "../../lib/analytics";
import { useVisibility } from "../../util/hooks.util";
import {
  acknowledgeEarlyAccess,
  earlyAccessAcknowledged,
} from "../../util/settings";
import { withStyles } from "../../util/style.utils";
import CustomDialog, { CustomDailogProps } from "../CustomDialog";

export type EarlyAccessDialogProps = {};

// Flag to enable the early access dialog
const MAIN_SITE_READY = false;

const EarlyAccessDialog: React.FunctionComponent<EarlyAccessDialogProps> = (
  props: EarlyAccessDialogProps
): JSX.Element | null => {
  const [dialogOpen, openDialog, closeDialog] = useVisibility(
    !earlyAccessAcknowledged()
  );

  const keepPlaying = (): void => {
    Analytics.trackEvent("EARLY_ACCESS_ACKNOWLEDGED", {
      directedToMain: false,
    });
    acknowledgeEarlyAccess();
    closeDialog();
  };

  const goToMainSite = (): void => {
    Analytics.trackEvent("EARLY_ACCESS_ACKNOWLEDGED", { directedToMain: true });
    acknowledgeEarlyAccess();
    location.href = MAIN_SITE;
  };

  if (!MAIN_SITE_READY) {
    return null;
  }

  return (
    <CustomDialog
      id="early-access"
      title={`Hello! ${COMMON_EMOJIS.WAVING}`}
      open={dialogOpen}
      onClose={closeDialog}
      actions={
        <ConfirmationActions>
          <ConfirmationButton variant="outlined" onClick={keepPlaying}>
            Stay on Alpha
          </ConfirmationButton>
          <ConfirmationButton variant="contained" onClick={goToMainSite}>
            Play on Main Site
          </ConfirmationButton>
        </ConfirmationActions>
      }
    >
      <>
        <Typography variant="body1">
          Thanks for playing the earliest version of Shufle! You are currently
          playing on the {'"alpha"'} site (alpha.shufle.ca). The {'"main"'} site
          (www.shufle.ca) is ready if you would like to play there. We will use
          the {'"alpha"'} site for testing new things so there is a possibility
          that things may break here while on the {'"main"'} site they will
          remain more stable.
        </Typography>
      </>
    </CustomDialog>
  );
};

const ConfirmationActions = withStyles("div", (theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "column",
    gap: "8px",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
}));

const ConfirmationButton = withStyles(Button, () => ({
  root: {
    minWidth: "96px",
  },
}));

export default EarlyAccessDialog;
