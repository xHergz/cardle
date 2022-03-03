import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Key from "../src/components/Key";
import Card, { CardSuit, CardValue } from "../src/lib/card";
import Deck from "../src/lib/deck";
import styles from "../styles/Home.module.css";

type Guess = {
  value?: CardValue;
  suit?: CardSuit;
};

const Home: NextPage = () => {
  const [currentDeck, setCurrentDeck] = useState<Deck>(new Deck(true));
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [currentGuess, setCurrentGuess] = useState<Guess[]>([]);

  useEffect(() => {
    setCurrentCards(currentDeck.deal(5).map((index) => new Card(index)));
  }, []);

  const redeal = (): void => {
    const newDeck = new Deck(true);
    console.log(newDeck);
    setCurrentCards(newDeck.deal(5).map((index) => new Card(index)));
    setCurrentDeck(newDeck);
  };

  //const clickSuit

  const clickKey = (): void => {};

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
          <p>Current Deck Size: {currentDeck.size}</p>
          <p>
            Current Cards:{" "}
            {currentCards.map((card) => card.toString()).join(", ")}
          </p>
          <button onClick={redeal}>Re-Deal</button>
        </div>
        <div className={styles.keyboardContainer}>
          <div className={styles.keyboardRow}>
            <Key onClick={clickKey} double={false}>
              {"\u2663"}
            </Key>
            <Key onClick={clickKey} double={false}>
              {"\u2666"}
            </Key>
            <Key onClick={clickKey} double={false}>
              {"\u2665"}
            </Key>
            <Key onClick={clickKey} double={false}>
              {"\u2660"}
            </Key>
          </div>
          <div className={styles.keyboardRow}>
            <Key onClick={clickKey} double={false}>
              2
            </Key>
            <Key onClick={clickKey} double={false}>
              3
            </Key>
            <Key onClick={clickKey} double={false}>
              4
            </Key>
            <Key onClick={clickKey} double={false}>
              5
            </Key>
            <Key onClick={clickKey} double={false}>
              6
            </Key>
            <Key onClick={clickKey} double={false}>
              7
            </Key>
            <Key onClick={clickKey} double={false}>
              8
            </Key>
            <Key onClick={clickKey} double={false}>
              9
            </Key>
            <Key onClick={clickKey} double={false}>
              10
            </Key>
          </div>
          <div className={styles.keyboardRow}>
            <Key onClick={clickKey} double>
              Enter
            </Key>
            <Key onClick={clickKey} double={false}>
              J
            </Key>
            <Key onClick={clickKey} double={false}>
              Q
            </Key>
            <Key onClick={clickKey} double={false}>
              K
            </Key>
            <Key onClick={clickKey} double={false}>
              A
            </Key>
            <Key onClick={clickKey} double>
              Back
            </Key>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>Cardle.</footer>
    </div>
  );
};

export default Home;
