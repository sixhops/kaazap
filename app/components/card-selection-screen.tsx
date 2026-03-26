"use client";

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
}

export function CardSelectionScreen({
  setCurrentView,
  playerSideDeck,
  setPlayerSideDeck,
}: CardSelectionScreenProps) {
  // TODO: Replace this with the modal asking if you are done selecting cards
  function handleNext() {
    setCurrentView(getNextView(VIEW_CARD_SELECTION));
  }

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

  // The card selection screen needs to display all static cards in the selection
  //  rows on the left and empty card boxes in the section on the right. When the
  //  user clicks on a card, the card should be added to the array which holds the
  //  side deck cards

  return (
    <div
      className="flex h-[800px] w-full max-w-[1024px] flex-col rounded-lg border border-black/10 bg-blue-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="card-selection-screen-content"
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
        <div className="flex flex-1 min-w-3/12">
          <CardRow
            size={10}
            cards={playerSideDeck}
            handleClick={removeFromSideDeck}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Next
        </button>
      </div>
    </div>
  );
}
