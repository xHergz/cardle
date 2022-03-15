import Help from "@mui/icons-material/Help";
import { SvgIcon } from "@mui/material";
import clsx from "clsx";

import Club from "../assets/suit-club-fill.svg";
import Diamond from "../assets/suit-diamond-fill.svg";
import Heart from "../assets/suit-heart-fill.svg";
import Spade from "../assets/suit-spade-fill.svg";
import { CardSuit } from "../lib/card";
import { makeStyles } from "../util/style.utils";

export type SuitIconProps = React.PropsWithChildren<{
  suit: CardSuit;
}>;

const useStyles = makeStyles()(() => ({
  suitIcon: {
    fontSize: "14px",
    margin: "2px",
  },
  red: {
    color: "red",
  },
  black: {
    color: "black",
  },
}));

const SuitIcon: React.FunctionComponent<SuitIconProps> = (
  props: SuitIconProps
): JSX.Element => {
  const { classes } = useStyles();
  const iconClasses = clsx({
    [classes.suitIcon]: true,
    [classes.black]: props.suit === "club" || props.suit === "spade",
    [classes.red]: props.suit === "diamond" || props.suit === "heart",
  });

  // Using any type here because of error below setting the component prop of SvgIcon
  const getIcon = (): any => {
    switch (props.suit) {
      case "club":
        return Club;
      case "diamond":
        return Diamond;
      case "heart":
        return Heart;
      case "spade":
        return Spade;
      default:
        return Help;
    }
  };

  return (
    <SvgIcon
      className={iconClasses}
      component={getIcon()}
      viewBox={"0 0 16 16"}
    />
  );
};

export default SuitIcon;
