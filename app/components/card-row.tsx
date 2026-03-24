"use client";

import { CardBox } from "@/app/components/card-box";
// import { VIEW_SPLASH, type ViewName, getNextView } from "@/app/constants/constants";

export interface CardRowProps {
  size: number;
  cards: string[];
}

export function CardRow({ size, cards }: CardRowProps) {
  // Map cards to CardBox components
  const cardBoxes = cards.map((card) => (
    <CardBox key={card} displayCard={card} clickEvent={() => {}} />
  ));

  return (
    <div
      className="flex w-auto h-36 rounded-lg border border-black/10 bg-red-200 p-6 shadow-sm"
      role="region"
      aria-labelledby="card-row"
      data-size={size}
    >
      {cardBoxes}
    </div>
  );
}
