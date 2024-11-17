"use client";

import { BorderColor, CardType } from "@/app/types";
import Header2 from "@/components/common/Header2";

interface Props {
  cards: CardType[];
}

export default function Cards({ cards }: Props) {
  function getBorderClass(borderColor: BorderColor): string {
    return `border-${borderColor}`;
  }
  return (
    <div className="w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${getBorderClass(card.borderColor)} my-6 rounded-2xl border-[6px] border-border p-6 text-center`}
        >
          <Header2 className="mb-2">{card.title}</Header2>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
