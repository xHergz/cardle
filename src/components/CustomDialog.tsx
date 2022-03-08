import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ModalProps,
  Typography,
} from "@mui/material";
import Close from "@mui/icons-material/Close";

import styles from "../../styles/CustomDialog.module.css";
import { isNil } from "lodash";

type CustomProps = {
  id: string;
  title: string;
  onClose?: () => void;
};

export type CustomDialogTitleProps = React.PropsWithChildren<CustomProps>;

const CustomDialogTitle: React.FunctionComponent<CustomDialogTitleProps> = (
  props: CustomDialogTitleProps
): JSX.Element => {
  return (
    <div className={styles.dialogTitle}>
      <Typography id={`${props.id}-modal-title`} variant="h6">
        {props.title}
      </Typography>
      <div className={styles.dialogTitleContent}>{props.children}</div>
      {!isNil(props.onClose) ? (
        <IconButton onClick={props.onClose}>
          <Close />
        </IconButton>
      ) : null}
    </div>
  );
};

export type CustomDailogProps = React.PropsWithChildren<
  Pick<ModalProps, "open"> & CustomProps
>;

const CustomDialog: React.FunctionComponent<CustomDailogProps> = (
  props: CustomDailogProps
): JSX.Element => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby={`${props.id}-modal-title`}
      aria-describedby={`${props.id}-modal-description`}
    >
      <CustomDialogTitle
        id={props.id}
        title={props.title}
        onClose={props.onClose}
      />
      <DialogContent>{props.children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
