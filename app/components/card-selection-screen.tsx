"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { CardRow } from "@/app/components/card-row";

import {
  VIEW_CARD_SELECTION,
  type ViewName,
  getNextView,
} from "@/app/constants/constants";

import {
  Card,
  BLUE_CARDS,
  RED_CARDS,
  SWITCH_CARDS,
} from "@/app/constants/card-data";

export interface CardSelectionScreenProps {
  setCurrentView: Dispatch<SetStateAction<ViewName>>;
  playerSideDeck: Card[];
  setPlayerSideDeck: Dispatch<SetStateAction<Card[]>>;
  startGame: () => void;
}

export function CardSelectionScreen({
  setCurrentView,
  playerSideDeck,
  setPlayerSideDeck,
  startGame,
}: CardSelectionScreenProps) {
  const [showStartConfirm, setShowStartConfirm] = useState(false);

  function handleNext() {
    console.log("handleNext");
    setShowStartConfirm(false);
    // TODO: Start the game. We will need to call some functions from the page.tsx to set things
    //  to the correct starting state.
    startGame();
    console.log("Switching to game screen");
    setCurrentView(getNextView(VIEW_CARD_SELECTION));
  }

  function handlePlayClick() {
    setShowStartConfirm(true);
  }

  function handleStartCancel() {
    setShowStartConfirm(false);
  }

  useEffect(() => {
    // Allows closing of the modal with Escape key
    if (!showStartConfirm) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowStartConfirm(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showStartConfirm]);

  const addToSideDeck = (card: Card, _index: number) => {
    void _index;
    if (playerSideDeck.length < 10) {
      setPlayerSideDeck([...playerSideDeck, card]);
    }
  };

  const removeFromSideDeck = (_card: Card, index: number) => {
    void _card;
    console.log("removeFromSideDeck", index);
    setPlayerSideDeck(playerSideDeck.filter((_, i) => i !== index));
  };

  const clearSideDeck = () => {
    setPlayerSideDeck([]);
  };

  // The card selection screen needs to display all static cards in the selection
  //  rows on the left and empty card boxes in the section on the right. When the
  //  user clicks on a card, the card should be added to the array which holds the
  //  side deck cards

  return (
    <div
      className="flex h-[800px] w-full max-w-[1024px] flex-col rounded-lg border border-black/10 bg-blue-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="card-selection-screen-title"
    >
      <h1
        id="card-selection-screen-title"
        className="text-center text-2xl font-semibold text-zinc-900"
      >
        Choose Side Deck
      </h1>

      <div id="foo" className="flex flex-1 w-full">
        <div className="flex flex-1 flex-col min-w-9/12">
          <CardRow
            size={BLUE_CARDS.length}
            cards={BLUE_CARDS}
            handleClick={addToSideDeck}
          />
          <CardRow
            size={RED_CARDS.length}
            cards={RED_CARDS}
            handleClick={addToSideDeck}
          />
          <CardRow
            size={SWITCH_CARDS.length}
            cards={SWITCH_CARDS}
            handleClick={addToSideDeck}
          />
        </div>
        <div className="flex flex-1 min-w-3/12 min-h-[682px]">
          <CardRow
            size={10}
            cards={playerSideDeck}
            handleClick={removeFromSideDeck}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center gap-3">
        <button
          type="button"
          disabled={playerSideDeck.length < 10}
          onClick={handlePlayClick}
          className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:text-zinc-200 disabled:opacity-70 disabled:hover:bg-zinc-400"
        >
          Play
        </button>
        <button
          type="button"
          onClick={clearSideDeck}
          className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Clear
        </button>
      </div>

      {showStartConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="presentation"
          onClick={handleStartCancel}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-game-confirm-title"
            className="w-full max-w-sm rounded-lg border border-black/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="start-game-confirm-title"
              className="text-center text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Start the game?
            </h2>
            <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Are you sure you want to start the game?
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={handleNext}
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                OK
              </button>
              <button
                type="button"
                onClick={handleStartCancel}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
