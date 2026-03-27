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
  const slots = Array.from({ length: size }, (_, i) => cards[i] ?? null); // TODO: Not sure if we want this logic.
  const cardBoxes = slots.map((card, index) => (
    <CardBox
      key={index}
      displayCard={card}
      clickEvent={() => {
        if (card !== null) handleClick(card, index);
      }}
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
