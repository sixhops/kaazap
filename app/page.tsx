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

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewName>(VIEW_SPLASH);

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-zinc-50 p-4 font-sans dark:bg-black">
      {currentView === VIEW_SPLASH && (
        <SplashScreen setCurrentView={setCurrentView} />
      )}
      {currentView === VIEW_CARD_SELECTION && (
        <CardSelectionScreen setCurrentView={setCurrentView} />
      )}
      {currentView === VIEW_GAME && (
        <GameScreen setCurrentView={setCurrentView} />
      )}
    </div>
  );
}
