import { Button, Typography } from "@mui/material";

import CustomDialog, { CustomDailogProps } from "./CustomDialog";

import styles from "../../styles/ConfirmationDialog.module.css";

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
        <div className={styles.confirmationActions}>
          <Button
            variant="outlined"
            className={styles.confirmationButton}
            onClick={props.onClose}
          >
            No
          </Button>
          <Button
            variant="contained"
            className={styles.confirmationButton}
            onClick={props.onConfirm}
          >
            Yes
          </Button>
        </div>
      }
    >
      <>
        <Typography variant="body1">{props.text}</Typography>
      </>
    </CustomDialog>
  );
};

export default ConfirmationDialog;
