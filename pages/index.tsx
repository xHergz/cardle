import { isNil } from "lodash";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ActionKey from "../src/components/ActionKey";
import { GuessData } from "../src/components/Guess";
import GuessGroup, { GUESSES } from "../src/components/GuessGroup";
import Key from "../src/components/Key";
import SuitKey from "../src/components/SuitKey";
import ValueKey from "../src/components/ValueKey";
import Card, { CardSuit, CardValue } from "../src/lib/card";
import Deck from "../src/lib/deck";
import styles from "../styles/Home.module.css";

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

    useEffect(() => {
        setCurrentCards(currentDeck.deal(5).map((index) => new Card(index)));
    }, [currentDeck]);

    const redeal = (): void => {
        setCurrentDeck(new Deck(true));
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

    console.log(submitted);
    return (
        <div className={styles.container}>
            <Head>
                <title>Cardle</title>
                <meta name="description" content="Cardle Game" />
                <meta charSet="UTF-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.gameArea}>
                    <h1 className={styles.title}>Welcome to Cardle!</h1>
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(0)}
                        submitted={currentTry > 0}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(1)}
                        submitted={currentTry > 1}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(2)}
                        submitted={currentTry > 2}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(3)}
                        submitted={currentTry > 3}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(4)}
                        submitted={currentTry > 4}
                    />
                    <GuessGroup
                        answer={currentCards}
                        guesses={getGuesses(5)}
                        submitted={currentTry > 5}
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
            </main>

            <footer className={styles.footer}>Cardle.</footer>
        </div>
    );
};

export default Home;
