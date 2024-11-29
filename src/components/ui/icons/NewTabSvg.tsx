import * as React from "react";
import { SVGProps } from "react";

const NewTabSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    strokeWidth={2.0}
    color="var(--icon-fg)"
    aria-labelledby="new-tab-icon-title new-tab-icon-description"
    {...props}
  >
    <title id="new-tab-icon-title">Open in new tab/window</title>
    <desc id="new-tab-icon-description">
      Icon representing that the link will open in a new browser tab or browser
      window.
    </desc>
    <path
      stroke="var(--icon-fg)"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 3h-6m6 0-9 9m9-9v6"
    />
    <path
      stroke="var(--icon-fg)"
      strokeLinecap="round"
      d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
    />
  </svg>
);

export const NewTabIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <span className="inline-block h-[24px] w-[24px] pt-1">
      <NewTabSvg {...props} />
    </span>
  );
};
