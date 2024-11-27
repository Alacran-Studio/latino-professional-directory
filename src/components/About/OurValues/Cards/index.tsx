"use client";

import { CardType, IconName } from "@/app/types";
import { useIsMobile } from "@/hooks/use-mobile";
import Header2 from "@/components/common/Header2";
import Paragraph from "@/components/common/Paragraph";

import GroupIcon from "@/components/About/icons/Values/Group";
import TrophyIcon from "@/components/About/icons/Values/Trophy";
import SchoolIcon from "@/components/About/icons/Values/School";
import HandshakeIcon from "@/components/About/icons/Values/Handshake";

interface Props {
  cards: CardType[];
}

export default function Cards({ cards }: Props) {
  const isMobile = useIsMobile();

  function getIcon(iconName: IconName) {
    const iconSizeMobile = 56;
    const iconSizeDesktop = 72;
    const iconComponents = {
      [IconName.Trophy]: TrophyIcon,
      [IconName.School]: SchoolIcon,
      [IconName.Handshake]: HandshakeIcon,
      [IconName.Group]: GroupIcon,
    };

    const IconComponent = iconComponents[iconName];

    if (!IconComponent) {
      return <></>;
    }

    return (
      <IconComponent
        width={isMobile ? iconSizeMobile : iconSizeDesktop}
        className="mb-2"
      />
    );
  }

  return (
    <div className="mx-auto grid h-auto max-w-[1024px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.borderColor} flex flex-col items-center rounded-2xl border-4 p-6 text-center sm:min-h-72 sm:max-w-96 md:min-h-64 md:border-[6px] lg:max-w-[500px]`}
        >
          <Header2 className="mb-2">{card.title}</Header2>
          {card.icon && getIcon(card.icon)}
          <Paragraph>{card.description}</Paragraph>
        </div>
      ))}
    </div>
  );
}
