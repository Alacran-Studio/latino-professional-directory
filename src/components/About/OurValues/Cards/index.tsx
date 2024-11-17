"use client";

import { BorderColor, CardType, IconName } from "@/app/types";
import Header2 from "@/components/common/Header2";
import GroupIcon from "@/components/About/icons/Values/Group";
import TrophyIcon from "@/components/About/icons/Values/Trophy";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  cards: CardType[];
}

export default function Cards({ cards }: Props) {
  const isMobile = useIsMobile();

  function getBorderClass(borderColor: BorderColor): string {
    return `border-${borderColor}`;
  }

  function getIcon(iconName: IconName) {
    const iconSizeMobile = 56;
    const iconSizeDesktop = 72;
    if (iconName === "trophy") {
      return (
        <TrophyIcon
          width={isMobile ? iconSizeMobile : iconSizeDesktop}
          height={isMobile ? iconSizeMobile : iconSizeDesktop}
          className="mb-2"
        />
      );
    } else if (iconName === "group") {
      return (
        <GroupIcon
          width={isMobile ? iconSizeMobile : iconSizeDesktop}
          className="mb-2"
        />
      );
    }

    return <></>;
  }
  return (
    <div className="w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${getBorderClass(card.borderColor)} my-6 flex flex-col items-center rounded-2xl border-[6px] p-6 text-center`}
        >
          <Header2 className="mb-2">{card.title}</Header2>
          {card.icon && getIcon(card.icon)}
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
