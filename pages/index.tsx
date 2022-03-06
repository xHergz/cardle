import { isNil } from "lodash";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
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

const TRIES = 6;

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
    const [currentDeck, setCurrentDeck] = useState<Deck>(new Deck(true));
    const [currentCards, setCurrentCards] = useState<Card[]>([]);
    const [guesses, setGuesses] = useState<GuessData[]>([]);
    const [currentGuess, setCurrentGuess] = useState<number>(0);
    const [submitted, setSubmitted] = useState<GuessData[][]>([]);
    const [currentTry, setCurrentTry] = useState<number>(0);
    const [infoModalOpen, openInfoModal, closeInfoModal] = useVisibility(false);

    useEffect(() => {
        setCurrentCards(currentDeck.deal(5).map((index) => new Card(index)));
    }, [currentDeck]);

    const redeal = (): void => {
        setCurrentDeck(new Deck(true));
        setGuesses([]);
        setCurrentGuess(0);
        setSubmitted([]);
        setCurrentTry(0);
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
        if (currentGuess >= GUESSES) {
            return;
        }
        updateGuess({ ...guesses[currentGuess], suit: suit });
    };

    const clickValue = (value: CardValue): void => {
        if (currentGuess >= GUESSES) {
            return;
        }
        const existing = getCurrentGuess();
        updateGuess({ ...existing, value: value });
    };

    const backspace = (): void => {
        if (currentGuess === 0) {
            return;
        }
        guesses.splice(currentGuess, 1);
        setCurrentGuess(currentGuess - 1);
        setGuesses([...guesses]);
    };

    const submit = (): void => {
        const current = getCurrentGuess();
        if (currentGuess >= GUESSES && currentTry < TRIES) {
            const newSubmitted = [...submitted];
            newSubmitted[currentTry] = guesses;
            setCurrentTry(currentTry + 1);
            setGuesses([]);
            setCurrentGuess(0);
            setSubmitted(newSubmitted);
            return;
        }
        if (isNil(current.suit) || isNil(current.value)) {
            return;
        }
        setCurrentGuess(currentGuess + 1);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Cardle</title>
                <meta name="description" content="Cardle Game" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="UTF-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <div className={styles.headerSection}>
                    <IconButton sx={{ color: "white" }} onClick={redeal}>
                        <Autorenew fontSize="large" />
                    </IconButton>
                    <IconButton sx={{ color: "white" }} onClick={openInfoModal}>
                        <Info fontSize="large" />
                    </IconButton>
                </div>
                <h2 className={styles.headerSection}>Cardle</h2>
                <div className={styles.headerSection}>
                    <IconButton sx={{ color: "white" }}>
                        <AutoGraph fontSize="large" />
                    </IconButton>
                    <IconButton sx={{ color: "white" }}>
                        <Settings fontSize="large" />
                    </IconButton>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.gameArea}>
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(0)}
                        submitted={currentTry > 0}
                        currentGuess={currentGuess}
                        active={currentTry === 0}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(1)}
                        submitted={currentTry > 1}
                        currentGuess={currentGuess}
                        active={currentTry === 1}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(2)}
                        submitted={currentTry > 2}
                        currentGuess={currentGuess}
                        active={currentTry === 2}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(3)}
                        submitted={currentTry > 3}
                        currentGuess={currentGuess}
                        active={currentTry === 3}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(4)}
                        submitted={currentTry > 4}
                        currentGuess={currentGuess}
                        active={currentTry === 4}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(5)}
                        submitted={currentTry > 5}
                        currentGuess={currentGuess}
                        active={currentTry === 5}
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
                <CustomDialog
                    id="info"
                    title="How to Play"
                    open={infoModalOpen}
                    onClose={closeInfoModal}
                >
                    <>
                        <Typography variant="body1">
                            Objective: Correctly guess the 5 random cards. You
                            get 6 guesses and will receive different information
                            after each guess.
                        </Typography>
                        <Typography variant="body1">
                            {"\u1F7EA"} = Correct suit, wrong value
                        </Typography>
                        <Typography variant="body1">
                            {"\u1F7E6"} = Correct value, wrong suit
                        </Typography>
                        <Typography variant="body1">
                            {"\u1F7E8"} = Correct value and suit, wrong position
                        </Typography>
                        <Typography variant="body1">
                            {"\u1F7E9"} = Correct value, wrong suit
                        </Typography>
                    </>
                </CustomDialog>
            </main>

            <footer className={styles.footer}>
                <span>Made by xHergz</span>
            </footer>
        </div>
    );
};

export default Home;
