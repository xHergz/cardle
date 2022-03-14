import AutoGraph from "@mui/icons-material/AutoGraph";
import Autorenew from "@mui/icons-material/Autorenew";
import Casino from "@mui/icons-material/Casino";
import Info from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";

import { makeStyles, withStyles } from "../util/style.utils";

export type NavBarProps = React.PropsWithChildren<{
  onResetGameClick: () => void;
  onNewGameClick: () => void;
  onInfoClick: () => void;
  onStatsClick: () => void;
  onOptionsClick: () => void;
  newGameDisabled: boolean;
}>;

const useStyles = makeStyles()({
  headerSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    ":nth-child(1)": {
      justifyContent: "flex-start",
    },
    ":nth-child(2)": {
      justifyContent: "center",
      flex: 0,
    },
    ":nth-child(3)": {
      justifyContent: "flex-end",
    },
  },
});

const NavBar: React.FunctionComponent<NavBarProps> = (
  props: NavBarProps
): JSX.Element => {
  const { classes } = useStyles();
  return (
    <StyledHeader>
      <div className={classes.headerSection}>
        <WhiteIconButton onClick={props.onResetGameClick}>
          <Autorenew fontSize="inherit" />
        </WhiteIconButton>
        <WhiteIconButton
          onClick={props.onNewGameClick}
          disabled={props.newGameDisabled}
        >
          <Casino fontSize="inherit" />
        </WhiteIconButton>
      </div>
      <h2 className={classes.headerSection}>Shufle</h2>
      <div className={classes.headerSection}>
        <WhiteIconButton onClick={props.onInfoClick}>
          <Info fontSize="inherit" />
        </WhiteIconButton>
        <WhiteIconButton onClick={props.onStatsClick}>
          <AutoGraph fontSize="inherit" />
        </WhiteIconButton>
        <WhiteIconButton onClick={props.onOptionsClick}>
          <Settings fontSize="inherit" />
        </WhiteIconButton>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = withStyles("header", (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: "48px",
    boxShadow: "0px 4px 8px grey",
    [theme.breakpoints.up("md")]: {
      height: "64px",
    },
  },
}));

const WhiteIconButton = withStyles(IconButton, (theme) => ({
  root: {
    color: theme.palette.common.white,
    fontSize: "1.5rem",
    [theme.breakpoints.only("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.1875rem",
    },
  },
}));

export default NavBar;
