"use client";

import { useState } from "react";
import {
  VIEW_CARD_SELECTION,
  VIEW_GAME,
  VIEW_SPLASH,
  type ViewName,
} from "@/app/constants/constants";
import { CardSelectionScreen } from "@/app/components/card-selection-screen";
import { GameScreen } from "@/app/components/game-screen";
import { SplashScreen } from "@/app/components/splash-screen";
import {
  Card,
  BASIC_OPPONENT_SIDE_DECK,
  HOUSE_CARDS,
} from "./constants/card-data";
import shuffle from "lodash/shuffle";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewName>(VIEW_SPLASH);

  const [playerSideDeck, setPlayerSideDeck] = useState<Card[]>([]);
  const [playerSideHand, setPlayerSideHand] = useState<Card[]>([]);
  const [playerBoardCards, setPlayerBoardCards] = useState<Card[]>([]);
  const [_opponentSideDeck, setOpponentSideDeck] = useState<Card[]>([]);
  const [opponentSideHand, setOpponentSideHand] = useState<Card[]>([]);
  const [opponentBoardCards, setopponentBoardCards] = useState<Card[]>([]);
  const [houseDeck] = useState<Card[]>(shuffle(HOUSE_CARDS));

  const initializeOpponentSideDeckAndHand = () => {
    console.log("initializeOpponentSideDeckAndHand");
    const opponentSideDeck = [...BASIC_OPPONENT_SIDE_DECK]; // TODO: add more opponent types
    const shuffledOpponentSideDeck = shuffle(opponentSideDeck);
    const opponentSideHand = [...shuffledOpponentSideDeck.slice(0, 4)];
    setOpponentSideDeck(opponentSideDeck);
    setOpponentSideHand(opponentSideHand);
  };

  const dealPlayerSideHand = () => {
    console.log("dealPlayerSideHand");
    const shuffledPlayerSideDeck = shuffle(playerSideDeck);
    const playerSideHand = [...shuffledPlayerSideDeck.slice(0, 4)];
    setPlayerSideHand(playerSideHand);
  };

  const startGame = () => {
    console.log("startGame");
    initializeOpponentSideDeckAndHand();
    dealPlayerSideHand();
  };

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-zinc-50 p-4 font-sans dark:bg-black">
      {currentView === VIEW_SPLASH && (
        <SplashScreen setCurrentView={setCurrentView} />
      )}
      {currentView === VIEW_CARD_SELECTION && (
        <CardSelectionScreen
          setCurrentView={setCurrentView}
          playerSideDeck={playerSideDeck}
          setPlayerSideDeck={setPlayerSideDeck}
          startGame={startGame}
        />
      )}
      {currentView === VIEW_GAME && (
        <GameScreen
          setCurrentView={setCurrentView}
          playerSideHand={playerSideHand}
          opponentSideHand={opponentSideHand}
          houseDeck={houseDeck}
          playerBoardCards={playerBoardCards}
          opponentBoardCards={opponentBoardCards}
        />
      )}
    </div>
  );
}
