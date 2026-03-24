"use client";

// import { VIEW_SPLASH, type ViewName, getNextView } from "@/app/constants/constants";

export interface CardBoxProps {
  displayCard: string;
  clickEvent: () => void;
}

export function CardBox({ displayCard, clickEvent }: CardBoxProps) {
  function handleClick() {
    clickEvent();
  }

  return (
    <div
      className="flex w-20 h-32 flex-col rounded-lg border border-black/10 bg-red-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="card-slot"
      onClick={handleClick}
    >
      {displayCard}
    </div>
  );
}
