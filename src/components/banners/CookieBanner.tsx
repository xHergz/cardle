import { Button, Typography } from "@mui/material";
import Link from "next/link";
import {
  allowAnalytics,
  analyticsSet,
  denyAnalytics,
} from "../../util/settings";
import { useVisibility } from "../../util/hooks.util";
import { makeStyles } from "../../util/style.utils";
import BottomBanner from "./BottomBanner";

export type CookieBannerProps = {};

const useStyles = makeStyles()((theme) => ({
  cookieBannerContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.info.main,
    padding: "16px",
    color: "white",
    gap: "8px",
  },
  link: {
    textDecoration: "underline",
  },
  cookieBannerActions: {
    display: "flex",
    gap: "16px",
    alignSelf: "flex-end",
    color: "white",
  },
}));

const CookieBanner: React.FunctionComponent<CookieBannerProps> = (
  props: CookieBannerProps
): JSX.Element | null => {
  const { classes } = useStyles();
  const [bannerOpen, openBanner, closeBanner] = useVisibility(!analyticsSet());

  const handleDecline = (): void => {
    denyAnalytics();
    closeBanner();
  };

  const handleAccept = (): void => {
    allowAnalytics();
    closeBanner();
  };

  return (
    <BottomBanner open={bannerOpen}>
      <div className={classes.cookieBannerContainer}>
        <Typography variant="h6" fontWeight="bolder">
          This website uses cookies
        </Typography>
        <Typography>
          This website uses an analytics tool to anonymously track how players
          interact with the game. This will help us determine things like what
          features are most used and how many people are playing the game.{" "}
          <Link href="/privacy-policy" passHref>
            <a className={classes.link}>Learn more</a>
          </Link>{" "}
          or{" "}
          <Link href="/preferences" passHref>
            <a className={classes.link}>manage your preferences</a>
          </Link>
          .
        </Typography>
        <div className={classes.cookieBannerActions}>
          <Button color="inherit" onClick={handleDecline}>
            No thanks
          </Button>
          <Button color="inherit" variant="outlined" onClick={handleAccept}>
            OK
          </Button>
        </div>
      </div>
    </BottomBanner>
  );
};

export default CookieBanner;
