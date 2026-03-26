"use client";

// import { VIEW_SPLASH, type ViewName, getNextView } from "@/app/constants/constants";
import { Card } from "@/app/constants/card-data";

export interface CardBoxProps {
  displayCard: Card;
  clickEvent: () => void;
}

export function CardBox({ displayCard, clickEvent }: CardBoxProps) {
  function handleClick() {
    clickEvent();
  }

  return (
    <div
      className="flex w-24 h-32 flex-col rounded-lg border border-black/10 bg-red-200 p-2 shadow-sm"
      role="region"
      aria-labelledby="card-slot"
      onClick={handleClick}
    >
      <p>{`Color: ${displayCard.color}`}</p>
      <br />
      <p>{`Value: ${displayCard.values.join(", ")}`}</p>
    </div>
  );
}
