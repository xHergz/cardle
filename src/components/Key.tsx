import React from "react";
import clsx from "clsx";

import styles from "../../styles/Keys.module.css";

export type KeyProps = React.PropsWithChildren<{
  onClick: () => void;
  double: boolean;
}>;

const Key: React.FunctionComponent<KeyProps> = (
  props: KeyProps
): JSX.Element => {
  const classes = clsx({
    [styles.key]: true,
    [styles.doubleKey]: props.double,
  });
  return (
    <button className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Key;
