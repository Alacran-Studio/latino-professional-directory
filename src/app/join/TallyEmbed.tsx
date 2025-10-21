"use client";

import { useEffect } from "react";

// TypeScript declaration for Tally global
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default function TallyEmbed() {
  useEffect(() => {
    // Check if Tally script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://tally.so/widgets/embed.js"]'
    );

    if (existingScript) {
      // Script already exists, just initialize
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
      return;
    }

    // Load Tally script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Tally when script loads
    script.onload = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    // No cleanup needed - keep script loaded for future navigations
  }, []);

  return (
    <main className="h-[calc(100vh-4rem)] w-full">
      <iframe
        data-tally-src="https://tally.so/r/nPa7q0?transparentBackground=1&formEventsForwarding=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Latino Professional Directory - Non-Profit Organization Onboarding Form"
        className="border-0"
      />
    </main>
  );
}
