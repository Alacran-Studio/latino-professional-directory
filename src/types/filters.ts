import { ReactNode } from "react";

export interface FilterConfig {
  key: string;
  label: string;
  icon: ReactNode;
  buttonClassName: string;
  chipClassName?: string;
  /** CSS color value for checkbox/accent. Use a CSS variable e.g. "var(--brand-gold)". Defaults to var(--brand-gold) if omitted. */
  accentColor?: string;
  analyticsKey: string;
}
