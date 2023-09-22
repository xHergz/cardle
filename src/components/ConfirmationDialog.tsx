import { Button, Typography } from "@mui/material";

import { withStyles } from "../util/style.utils";
import CustomDialog, { CustomDailogProps } from "./CustomDialog";

export type ConfirmationDialogProps = Pick<
  CustomDailogProps,
  "open" | "onClose" | "title"
> & {
  onConfirm: () => void;
  text: string;
};

const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = (
  props: ConfirmationDialogProps
): JSX.Element => {
  return (
    <CustomDialog
      id="confirmation"
      title={props.title}
      open={props.open}
      onClose={props.onClose}
      actions={
        <ConfirmationActions>
          <ConfirmationButton variant="outlined" onClick={props.onClose}>
            No
          </ConfirmationButton>
          <ConfirmationButton variant="contained" onClick={props.onConfirm}>
            Yes
          </ConfirmationButton>
        </ConfirmationActions>
      }
    >
      <>
        <Typography variant="body1">{props.text}</Typography>
      </>
    </CustomDialog>
  );
};

const ConfirmationActions = withStyles("div", () => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
}));

const ConfirmationButton = withStyles(Button, () => ({
  root: {
    minWidth: "96px",
  },
}));

export default ConfirmationDialog;
