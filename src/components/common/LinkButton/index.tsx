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
  const buttonClasses =
    type === "compact"
      ? "rounded-lg bg-primary px-3 py-1 text-sm text-white transition-all duration-200 hover:bg-primary-hover"
      : "rounded-xl bg-primary px-4 py-2 text-sm text-white transition-all duration-200 sm:px-8 sm:py-4 sm:text-2xl";

  return (
    <Link href={href} className={buttonClasses}>
      {title}
    </Link>
  );
}
