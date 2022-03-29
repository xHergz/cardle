import Button from "@mui/material/Button";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  allowAnalytics,
  analyticsAllowed,
  denyAnalytics,
} from "../src/util/analytics";

import { makeStyles } from "../src/util/style.utils";

const useStyles = makeStyles()({
  container: {
    margin: "0 auto",
    padding: "32px",
    maxWidth: "1200px",
  },
  buttonActions: {
    display: "flex",
    gap: "16px",
  },
});

const Preferences: NextPage = () => {
  const { classes } = useStyles();
  const [analyticsOptedIn, setAnalyticsOptedIn] = useState<boolean>(
    analyticsAllowed()
  );

  const handleAllowAnalytics = (): void => {
    allowAnalytics();
    setAnalyticsOptedIn(true);
  };

  const handleDisableAnalytics = (): void => {
    denyAnalytics();
    setAnalyticsOptedIn(false);
  };

  return (
    <div className={classes.container}>
      <h2>Shufle Preferences</h2>
      <Link href="/" passHref>
        <Button variant="outlined" color="secondary">
          Back to Shufle
        </Button>
      </Link>
      <p>
        <strong>NOTE:</strong> Preferences are saved locally on your device in
        your browser storage. They will not transfer to other devices/browsers
        unless you set them again manually.
      </p>
      <h4>Allow Analytics</h4>
      <p>
        Allow us to use analytics to track usage of specific game features (i.e.
        when a player starts a game to see how many games are played, when a
        player switches game modes to see which ones are the most popular,
        etc.). All data is anonymous and will only be tracked while you are
        opted in (everyone is opted out by default).
      </p>
      {analyticsOptedIn ? (
        <p>
          You are currently <strong>OPTED IN</strong>
        </p>
      ) : (
        <p>
          You are currently <strong>OPTED OUT</strong>
        </p>
      )}
      <div className={classes.buttonActions}>
        <Button variant="outlined" onClick={handleDisableAnalytics}>
          Disable Analytics
        </Button>
        <Button variant="contained" onClick={handleAllowAnalytics}>
          Allow Analytics
        </Button>
      </div>
    </div>
  );
};

export default Preferences;
