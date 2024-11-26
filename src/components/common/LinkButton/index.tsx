import Link from "next/link";

interface ButtonProps {
  href: string;
  title: string;
  type?: "compact" | "default";
}

export default function LinkButton({
  href,
  title,
  type = "default",
}: ButtonProps) {
  let className =
    "bg-primary text-sm text-white transition-all duration-200 hover:bg-primary-hover";
  className +=
    type === "compact"
      ? " rounded-lg px-3 py-1 sm:px-4 sm:py-2 sm:text-lg"
      : " rounded-xl px-4 py-2 sm:px-8 sm:py-4 sm:text-2xl";

  return (
    <Link href={href} className={className}>
      {title}
    </Link>
  );
}
