"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  VIEW_GAME,
  type ViewName,
  getNextView,
  primaryButtonClassName,
} from "@/app/constants/constants";
import { Card } from "@/app/constants/card-data";
import { CardRow } from "@/app/components/card-row";

export interface GameScreenProps {
  setCurrentView: Dispatch<SetStateAction<ViewName>>;
  playerSideHand: Card[];
  opponentSideHand: Card[];
  houseDeck: Card[];
  playerBoardCards: Card[];
  opponentBoardCards: Card[];
}

export function GameScreen({
  setCurrentView,
  playerSideHand,
  opponentSideHand,
  houseDeck,
  playerBoardCards,
  opponentBoardCards,
}: GameScreenProps) {
  function handleNext() {
    setCurrentView(getNextView(VIEW_GAME));
  }
  function playCard(card: Card, index: number) {
    console.log("playCard", card, index);
  }

  return (
    <div
      className="flex h-[800px] w-full max-w-[1024px] flex-col rounded-lg border border-black/10 bg-green-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="game-screen-title"
    >
      <div id="nameRow" className="flex items-center justify-center">
        <div id="playerTurnIndicator" className="basis-1/16">
          <div
            id="playerTurnIndicatorLight"
            className="min-w-[45px] min-h-[45px] bg-red-500 rounded-full"
          ></div>
        </div>
        <div
          id="playerName"
          className="basis-1/4 flex items-center justify-start bg-black text-white"
        >
          <p id="playerNameText">Player</p>
        </div>
        <div id="scores" className="basis-1/8 flex items-center justify-center">
          <div id="playerScore">
            <div
              id="playerScoreText"
              className="min-w-[40px] min-h-[40px] bg-black text-white rounded-full text-white text-center flex items-center justify-center"
            >
              <p>0</p>
            </div>
          </div>
          <div id="opponentScore">
            <div
              id="opponentScoreText"
              className="min-w-[40px] min-h-[40px] bg-black text-white rounded-full text-white text-center flex items-center justify-center"
            >
              <p>0</p>
            </div>
          </div>
        </div>
        <div
          id="opponentName"
          className="basis-1/4 flex items-center justify-end bg-black text-white"
        >
          <p id="opponentNameText">Opponent</p>
        </div>
        <div id="opponentTurnIndicator" className="basis-1/16">
          <div
            id="opponentTurnIndicatorLight"
            className="min-w-[45px] min-h-[45px] bg-red-500 rounded-full"
          ></div>
        </div>
      </div>
      <div
        id="mainBoardRow"
        className="flex items-center justify-center gap-x-6"
      >
        <div
          id="playerWinCounter"
          className="basis-1/16 flex flex-col items-center justify-center bg-black"
        >
          <div
            id="playerWin1"
            className="min-w-[25px] min-h-[25px] bg-red-500 rounded-full"
          ></div>
          <div
            id="playerWin2"
            className="min-w-[25px] min-h-[25px] bg-red-500 rounded-full"
          ></div>
          <div
            id="playerWin3"
            className="min-w-[25px] min-h-[25px] bg-red-500 rounded-full"
          ></div>
        </div>
        <div
          id="playerMainBoard"
          className="basis-1/2 min-w-[348px] max-w-[348px] min-h-[410px] max-h-[410px] flex items-center justify-end px-2"
        >
          <CardRow size={9} cards={playerBoardCards} handleClick={() => {}} />
        </div>
        <div
          id="opponentMainBoard"
          className="basis-1/2 min-w-[348px] max-w-[348px] min-h-[410px] max-h-[410px] flex items-center justify-start px-2"
        >
          <CardRow size={9} cards={opponentBoardCards} handleClick={() => {}} />
        </div>
        <div
          id="opponentWinCounter"
          className="basis-1/16 flex flex-col items-center justify-center bg-black"
        >
          <div
            id="opponentWin1"
            className="min-w-[25px] min-h-[25px] bg-red-500 rounded-full"
          ></div>
          <div
            id="opponentWin2"
            className="min-w-[25px] min-h-[25px] bg-red-500 rounded-full"
          ></div>
          <div
            id="opponentWin3"
            className="min-w-[25px] min-h-[25px] bg-red-500 rounded-full"
          ></div>
        </div>
      </div>
      <div id="handRow" className="flex items-center justify-center">
        <div id="playerSide" className="flex flex-col items-center basis-1/2">
          <div
            id="playerHandTitle"
            className="bg-black text-white w-11/12 flex items-center justify-center"
          >
            <p id="playerHandTitleText">Player Hand</p>
          </div>
          <CardRow size={4} cards={playerSideHand} handleClick={() => {}} />
          <div
            id="cardActionButtons"
            className="flex items-center justify-center gap-x-4 mb-2"
          >
            {/* Read player side hand to determine which buttons need to show up */}
            {/* Should the hand be an object instead of an array so that a card will
              stay in its original place if another card is removed? */}
            <div
              id="card0Actions"
              className="flex items-center justify-center bg-black text-white rounded-md w-24 h-8"
            ></div>
            <div
              id="card1Actions"
              className="flex items-center justify-center bg-black text-white rounded-md w-24 h-8"
            ></div>
            <div
              id="card2Actions"
              className="flex items-center justify-center bg-black text-white rounded-md w-24 h-8"
            ></div>
            <div
              id="card3Actions"
              className="flex items-center justify-center bg-black text-white rounded-md w-24 h-8"
            ></div>
          </div>
          <div
            id="symbolLegend"
            className="flex flex-col items-center justify-start bg-black text-white w-11/12 h-[88px]"
          >
            <div
              id="leftOperationLegend"
              className="flex items-center justify-start"
            >
              <p>Flip hand card</p>
            </div>
            <div
              id="rightOperationLegend"
              className="flex items-center justify-start"
            >
              <p>Change card value</p>
            </div>
          </div>
        </div>
        <div id="opponentSide" className="flex flex-col items-center basis-1/2">
          <div
            id="opponentHandTitle"
            className="bg-black text-white w-11/12 flex items-center justify-center"
          >
            <p id="opponentHandTitleText">Opponent Hand</p>
          </div>
          <CardRow size={4} cards={opponentSideHand} handleClick={() => {}} />
          <div
            id="cardActionButtons"
            className="flex items-center justify-center gap-x-4 mb-2 min-w-[432px] max-w-[432px] min-h-[32px] max-h-[32px] bg-black text-white rounded-md"
          ></div>
          <div
            id="playerActionButtons"
            className="flex flex-col items-center justify-center w-11/12"
          >
            <div
              id="top"
              className="flex w-full max-w-md items-center justify-center gap-3"
            >
              <button
                id="topLeftButton"
                type="button"
                className={`flex-1 ${primaryButtonClassName}`}
              >
                End Turn
              </button>
              <button
                id="topRightButton"
                type="button"
                className={`flex-1 ${primaryButtonClassName}`}
              >
                Stand
              </button>
            </div>
            <div
              id="bottom"
              className="mt-2 flex w-full max-w-md items-center justify-center"
            >
              <button
                id="bottomButton"
                type="button"
                className={`w-full ${primaryButtonClassName}`}
              >
                Forfeit Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
