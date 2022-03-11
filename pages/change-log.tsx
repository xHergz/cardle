import { Button } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";

import styles from "../styles/ChangeLog.module.css";

const ChangeLog: NextPage = () => {
  return (
    <div className={styles.changeLog}>
      <h1>Change Log</h1>
      <Link href="/">
        <Button variant="outlined" color="secondary">
          Back to Shufle
        </Button>
      </Link>
      <h4>v0.1.2</h4>
      <ul>
        <li>Renamed to Shufle</li>
        <li>Added forcing HTTPS</li>
      </ul>
      <h4>v0.1.1</h4>
      <ul>
        <li>Fixed the last row of emojis not being added to the share text</li>
        <li>
          Fixed the share button being disabled when the game is over with an
          incorrect answer
        </li>
        <li>
          Fixed the stats modal not showing when the game is ended with an
          incorrect answer
        </li>
      </ul>
      <h4>v0.1.0</h4>
      <ul>
        <li>Added 2 different game modes: Daily and Classic</li>
        <li>Added the options dialog to switch game modes</li>
        <li>
          Added the stats dialog to see the puzzle # and share the results
        </li>
        <li>Added current game mode and version to the footer</li>
        <li>Added the change log</li>
        <li>Fixed the emojis in the info dialog legend</li>
        <li>Fixed the diamond/heart emojis being reversed</li>
        <li>Fixed the backspace button behaviour</li>
        <li>Fixed some styling issues</li>
      </ul>
    </div>
  );
};

export default ChangeLog;
