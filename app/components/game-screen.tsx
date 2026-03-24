"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  VIEW_GAME,
  type ViewName,
  getNextView,
} from "@/app/constants/constants";

export interface GameScreenProps {
  setCurrentView: Dispatch<SetStateAction<ViewName>>;
}

export function GameScreen({ setCurrentView }: GameScreenProps) {
  function handleNext() {
    setCurrentView(getNextView(VIEW_GAME));
  }

  return (
    <div
      className="flex h-[640px] w-full max-w-[800px] flex-col rounded-lg border border-black/10 bg-green-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="game-screen-title"
    >
      <h1
        id="game-screen-title"
        className="text-center text-2xl font-semibold text-zinc-900"
      >
        GameScreen
      </h1>
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
