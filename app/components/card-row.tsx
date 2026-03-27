"use client";

import { CardBox } from "@/app/components/card-box";
import { Card } from "@/app/constants/card-data";
// import { VIEW_SPLASH, type ViewName, getNextView } from "@/app/constants/constants";

export interface CardRowProps {
  size: number;
  cards: Card[];
  handleClick: (card: Card, index: number) => void;
}

export function CardRow({ size, cards, handleClick }: CardRowProps) {
  // Map cards to CardBox components
  const cardBoxes = cards.map((card: Card, index: number) => (
    <CardBox
      key={index}
      displayCard={card}
      clickEvent={() => handleClick(card, index)}
    />
  ));

  return (
    <div
      className="flex flex-wrap content-start items-start gap-x-4 gap-y-2 w-auto h-auto rounded-lg border border-black/10 p-1 shadow-sm"
      role="region"
      aria-labelledby="card-row"
      data-size={size}
    >
      {cardBoxes}
    </div>
  );
}
