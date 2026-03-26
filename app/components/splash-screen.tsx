"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  VIEW_SPLASH,
  type ViewName,
  getNextView,
} from "@/app/constants/constants";

export interface SplashScreenProps {
  setCurrentView: Dispatch<SetStateAction<ViewName>>;
}

export function SplashScreen({ setCurrentView }: SplashScreenProps) {
  function handleNext() {
    setCurrentView(getNextView(VIEW_SPLASH));
  }

  return (
    <div
      className="flex h-[800px] w-full max-w-[1024px] flex-col rounded-lg border border-black/10 bg-red-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="splash-screen-title"
    >
      <h1
        id="splash-screen-title"
        className="text-center text-2xl font-semibold text-zinc-900"
      >
        SplashScreen
      </h1>
      <div className="flex flex-1 flex-col rounded-md items-center justify-center bg-black text-white">
        <p>Welcome to Kaazap!</p>
        <p>Click the button below to start the game.</p>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Choose Your Cards
        </button>
      </div>
    </div>
  );
}
