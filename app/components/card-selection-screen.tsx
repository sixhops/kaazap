"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  VIEW_CARD_SELECTION,
  type ViewName,
  getNextView,
} from "@/constants";

export interface CardSelectionScreenProps {
  setCurrentView: Dispatch<SetStateAction<ViewName>>;
}

export function CardSelectionScreen({
  setCurrentView,
}: CardSelectionScreenProps) {
  function handleNext() {
    setCurrentView(getNextView(VIEW_CARD_SELECTION));
  }

  return (
    <div
      className="flex h-[640px] w-full max-w-[800px] flex-col rounded-lg border border-black/10 bg-blue-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="card-selection-screen-title"
    >
      <h1
        id="card-selection-screen-title"
        className="text-center text-2xl font-semibold text-zinc-900"
      >
        CardSelectionScreen
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
