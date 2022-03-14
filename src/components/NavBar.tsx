import AutoGraph from "@mui/icons-material/AutoGraph";
import Autorenew from "@mui/icons-material/Autorenew";
import Casino from "@mui/icons-material/Casino";
import Info from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import clsx from "clsx";

import { withStyles } from "../util/style.utils";

import styles from "../../styles/NavBar.module.css";

export type NavBarProps = React.PropsWithChildren<{
  onResetGameClick: () => void;
  onNewGameClick: () => void;
  onInfoClick: () => void;
  onStatsClick: () => void;
  onOptionsClick: () => void;
  newGameDisabled: boolean;
}>;

const NavBar: React.FunctionComponent<NavBarProps> = (
  props: NavBarProps
): JSX.Element => {
  const redealButtonClasses = clsx({
    [styles.headerIconButton]: true,
    [styles.disabledIconButton]: props.newGameDisabled,
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerSection}>
        <IconButton
          className={styles.headerIconButton}
          onClick={props.onResetGameClick}
        >
          <Autorenew className={styles.headerIcon} />
        </IconButton>
        <WhiteIconButton
          onClick={props.onNewGameClick}
          disabled={props.newGameDisabled}
        >
          <Casino className={styles.headerIcon} />
        </WhiteIconButton>
      </div>
      <h2 className={styles.headerSection}>Shufle</h2>
      <div className={styles.headerSection}>
        <IconButton
          className={styles.headerIconButton}
          onClick={props.onInfoClick}
        >
          <Info className={styles.headerIcon} />
        </IconButton>
        <IconButton
          className={styles.headerIconButton}
          onClick={props.onStatsClick}
        >
          <AutoGraph className={styles.headerIcon} />
        </IconButton>
        <IconButton
          className={styles.headerIconButton}
          onClick={props.onOptionsClick}
        >
          <Settings className={styles.headerIcon} />
        </IconButton>
      </div>
    </header>
  );
};

const WhiteIconButton = withStyles(IconButton, (theme) => ({
  root: {
    color: "white",
  },
}));

export default NavBar;
