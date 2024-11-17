"use client";

import { CardType } from "@/app/types";

interface Props {
  cards: CardType[];
}

export default function Cards({ cards }: Props) {
  return (
    <div>
      {cards.map((card, index) => (
        <div key={index}>
          <h1>{card.title}</h1>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
