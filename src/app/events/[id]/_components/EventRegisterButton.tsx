"use client";

import { NewTabIcon } from "@/components/ui/icons/NewTabSvg";
import { trackEventRegisterClick } from "@/lib/analytics";

interface EventRegisterButtonProps {
  eventId: number | string;
  eventName: string;
  registrationUrl: string;
}

export default function EventRegisterButton({
  eventId,
  eventName,
  registrationUrl,
}: EventRegisterButtonProps) {
  return (
    <a
      className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-2 text-label text-white hover:bg-primary-hover"
      href={registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEventRegisterClick(eventId, eventName)}
    >
      <span>Register</span>
      <NewTabIcon />
    </a>
  );
}
