import { isNil } from "lodash";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, IconButton, Snackbar, Typography } from "@mui/material";
import AutoGraph from "@mui/icons-material/AutoGraph";
import Autorenew from "@mui/icons-material/Autorenew";
import Info from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";
import ActionKey from "../src/components/ActionKey";
import CustomDialog from "../src/components/CustomDialog";
import { GuessData } from "../src/components/Guess";
import GuessGroup, { GUESSES } from "../src/components/GuessGroup";
import SuitKey from "../src/components/SuitKey";
import ValueKey from "../src/components/ValueKey";
import Card, { CardSuit, CardValue } from "../src/lib/card";
import Deck from "../src/lib/deck";
import styles from "../styles/Home.module.css";
import { useVisibility } from "../src/util/hooks.util";
import { differenceInCalendarDays, startOfDay, subDays } from "date-fns";
import InfoDialog from "../src/components/InfoDialog";
import StatisticsDialog from "../src/components/StatisticsDialog";
import OptionsDialog from "../src/components/OptionsDialog";
import { GameMode } from "../src/components/GameModeOption";
import {
  getDailyNumber,
  getResultMessage,
  getStartOfUtcDay,
} from "../src/util/common.util";
import { VERSION } from "../src/constants/version";
import { getGameModeLabel } from "../src/util/game-mode.util";
import {
  getBlankGuessEmojis,
  getGuessEmojis,
  isCorrectAnswer,
} from "../src/util/card.utils";
import NavBar from "../src/components/NavBar";
import ConfirmationDialog from "../src/components/ConfirmationDialog";
import { MAX_TRIES } from "../src/constants/rules";
import { createSharableResult } from "../src/util/result.utils";

const THE_BEGINNING = 1646651697513;

/*
                    <p>Current Deck Size: {currentDeck.size}</p>
                    <p>
                        Current Cards:{" "}
                        {currentCards.map((card) => card.toString()).join(", ")}
                    </p>
                    <button onClick={redeal}>Re-Deal</button>
                    <p>{JSON.stringify(getCurrentGuess())}</p>
*/

const Home: NextPage = () => {
  const [currentDeck, setCurrentDeck] = useState<Deck>(new Deck());
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [guesses, setGuesses] = useState<GuessData[]>([]);
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const [submitted, setSubmitted] = useState<GuessData[][]>([]);
  const [currentTry, setCurrentTry] = useState<number>(0);
  const [resultToastOpen, openResultToast, closeResultToast] =
    useVisibility(false);
  const [copiedToastOpen, openCopiedToast, closeCopiedToast] =
    useVisibility(false);
  const [infoDialogOpen, openInfoDialog, closeInfoDialog] =
    useVisibility(false);
  const [statsDialogOpen, openStatsDialog, closeStatsDialog] =
    useVisibility(false);
  const [optionsDialogOpen, openOptionsDialog, closeOptionsDialog] =
    useVisibility(false);
  const [confirmResetModalOpen, openConfirmResetModal, closeConfirmResetModal] =
    useVisibility(false);
  const [
    confirmRedealModalOpen,
    openConfirmRedealModal,
    closeConfirmRedealModal,
  ] = useVisibility(false);
  const [gameMode, setGameMode] = useState<GameMode>("daily");

  const lastSubmission =
    submitted.length > 0 ? submitted[submitted.length - 1] : null;
  const complete =
    !isNil(lastSubmission) &&
    (isCorrectAnswer(lastSubmission, currentCards) || currentTry >= MAX_TRIES);
  const correctAnswer = !isNil(lastSubmission)
    ? isCorrectAnswer(lastSubmission, currentCards)
    : false;

  useEffect(() => {
    redeal();
  }, []);

  useEffect(() => {
    setCurrentCards(currentDeck.deal(5).map((index) => new Card(index)));
  }, [currentDeck]);

  useEffect(() => {
    redeal();
  }, [gameMode]);

  const reset = (): void => {
    setGuesses([]);
    setCurrentGuess(0);
    setSubmitted([]);
    setCurrentTry(0);
    closeConfirmResetModal();
  };

  const redeal = (): void => {
    const newDeck = new Deck();
    if (gameMode === "daily") {
      newDeck.shuffle(getStartOfUtcDay());
    } else {
      newDeck.shuffle();
    }
    setCurrentDeck(newDeck);
    reset();
    closeConfirmRedealModal();
  };

  const updateGuess = (guess: GuessData): void => {
    const newGuesses = [...guesses];
    newGuesses[currentGuess] = guess;
    setGuesses(newGuesses);
    if (!isNil(guess.suit) && !isNil(guess.value)) {
      setCurrentGuess(currentGuess + 1);
    }
  };

  const getCurrentGuess = (): GuessData => {
    return isNil(guesses[currentGuess]) ? {} : guesses[currentGuess];
  };

  const getGuesses = (index: number): GuessData[] => {
    if (currentTry === index) {
      return guesses;
    }

    return isNil(submitted[index]) ? [] : submitted[index];
  };

  const clickSuit = (suit: CardSuit): void => {
    if (currentGuess >= GUESSES || complete) {
      return;
    }
    updateGuess({ ...guesses[currentGuess], suit: suit });
  };

  const clickValue = (value: CardValue): void => {
    if (currentGuess >= GUESSES || complete) {
      return;
    }
    const existing = getCurrentGuess();
    updateGuess({ ...existing, value: value });
  };

  const backspace = (): void => {
    if (currentGuess === 0) {
      setGuesses([]);
      return;
    }
    if (isNil(guesses[currentGuess])) {
      setCurrentGuess(currentGuess - 1);
      guesses.splice(currentGuess - 1, 1);
    } else {
      guesses.splice(currentGuess, 1);
    }
    setGuesses([...guesses]);
  };

  const submit = (): void => {
    const current = getCurrentGuess();
    if (currentGuess >= GUESSES && currentTry < MAX_TRIES) {
      const newSubmitted = [...submitted];
      newSubmitted[currentTry] = guesses;
      setCurrentTry(currentTry + 1);
      setGuesses([]);
      setCurrentGuess(0);
      setSubmitted(newSubmitted);
      const isCorrect = isCorrectAnswer(guesses, currentCards);
      if (isCorrect || currentTry >= MAX_TRIES - 1) {
        setTimeout(() => {
          openStatsDialog();
        }, 3000);
        openResultToast();
      }
      return;
    }
    if (isNil(current.suit) || isNil(current.value)) {
      return;
    }
    setCurrentGuess(currentGuess + 1);
  };

  const shareResults = async (): Promise<void> => {
    const text = createSharableResult(
      gameMode,
      currentCards,
      correctAnswer,
      submitted
    );

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Could not write to clipboard");
      console.error(err);
    }
    closeStatsDialog();
    openCopiedToast();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Shufle</title>
        <meta name="description" content="Shufle Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <NavBar
        onResetGameClick={openConfirmResetModal}
        onNewGameClick={openConfirmRedealModal}
        onInfoClick={openInfoDialog}
        onStatsClick={openStatsDialog}
        onOptionsClick={openOptionsDialog}
        newGameDisabled={gameMode === "daily"}
      />
      <main className={styles.main}>
        <div className={styles.gameArea}>
          <GuessGroup
            answer={currentCards}
            guesses={getGuesses(0)}
            submitted={currentTry > 0}
            currentGuess={currentGuess}
            active={currentTry === 0 && !complete}
          />
          <GuessGroup
            answer={currentCards}
            guesses={getGuesses(1)}
            submitted={currentTry > 1}
            currentGuess={currentGuess}
            active={currentTry === 1 && !complete}
          />
          <GuessGroup
            answer={currentCards}
            guesses={getGuesses(2)}
            submitted={currentTry > 2}
            currentGuess={currentGuess}
            active={currentTry === 2 && !complete}
          />
          <GuessGroup
            answer={currentCards}
            guesses={getGuesses(3)}
            submitted={currentTry > 3}
            currentGuess={currentGuess}
            active={currentTry === 3 && !complete}
          />
          <GuessGroup
            answer={currentCards}
            guesses={getGuesses(4)}
            submitted={currentTry > 4}
            currentGuess={currentGuess}
            active={currentTry === 4 && !complete}
          />
          <GuessGroup
            answer={currentCards}
            guesses={getGuesses(5)}
            submitted={currentTry > 5}
            currentGuess={currentGuess}
            active={currentTry === 5 && !complete}
          />
        </div>
        <div className={styles.keyboardContainer}>
          <div className={styles.keyboardRow}>
            <SuitKey onClick={clickSuit} suit="club" />
            <SuitKey onClick={clickSuit} suit="diamond" />
            <SuitKey onClick={clickSuit} suit="heart" />
            <SuitKey onClick={clickSuit} suit="spade" />
          </div>
          <div className={styles.keyboardRow}>
            <ValueKey onClick={clickValue} value="2" />
            <ValueKey onClick={clickValue} value="3" />
            <ValueKey onClick={clickValue} value="4" />
            <ValueKey onClick={clickValue} value="5" />
            <ValueKey onClick={clickValue} value="6" />
            <ValueKey onClick={clickValue} value="7" />
            <ValueKey onClick={clickValue} value="8" />
            <ValueKey onClick={clickValue} value="9" />
            <ValueKey onClick={clickValue} value="10" />
          </div>
          <div className={styles.keyboardRow}>
            <ActionKey onClick={submit} label="Enter" />
            <ValueKey onClick={clickValue} value="jack" />
            <ValueKey onClick={clickValue} value="queen" />
            <ValueKey onClick={clickValue} value="king" />
            <ValueKey onClick={clickValue} value="ace" />
            <ActionKey onClick={backspace} label="Back" />
          </div>
        </div>
        <Snackbar
          open={resultToastOpen}
          autoHideDuration={3000}
          onClose={closeResultToast}
          message={getResultMessage(submitted.length)}
        />
        <Snackbar
          open={copiedToastOpen}
          autoHideDuration={3000}
          onClose={closeCopiedToast}
          message="Copied to clipboard"
        />
        <InfoDialog open={infoDialogOpen} onClose={closeInfoDialog} />
        <StatisticsDialog
          open={statsDialogOpen}
          onClose={closeStatsDialog}
          mode={gameMode}
          complete={complete}
          onShare={shareResults}
        />
        <OptionsDialog
          open={optionsDialogOpen}
          onClose={closeOptionsDialog}
          currentMode={gameMode}
          onChangeGameMode={setGameMode}
        />
        <ConfirmationDialog
          title="Confirm Reset"
          open={confirmResetModalOpen}
          onClose={closeConfirmResetModal}
          onConfirm={reset}
          text="Are you sure you want to reset your current game? You will lose your progress."
        />
        <ConfirmationDialog
          title="Confirm Redeal"
          open={confirmRedealModalOpen}
          onClose={closeConfirmRedealModal}
          onConfirm={redeal}
          text="Are you sure you want to redeal your current game? You will lose your progress."
        />
      </main>

      <footer className={styles.footer}>
        <div>{getGameModeLabel(gameMode)}</div>
        <div>Made by xHergz</div>
        <Link href="/change-log">{VERSION}</Link>
      </footer>
    </div>
  );
};

export default Home;
