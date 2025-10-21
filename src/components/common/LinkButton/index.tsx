import Link from "next/link";

interface ButtonProps {
  href: string;
  title: string;
  className?: string;
}

export default function LinkButton({
  href,
  title,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[15px] text-white transition-all duration-200 hover:bg-primary-hover ${className}`}
    >
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
