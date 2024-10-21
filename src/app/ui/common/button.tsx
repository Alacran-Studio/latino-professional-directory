import Link from "next/link";

interface ButtonProps {
  href: string;
  title: string;
}

export default function Button({ href, title }: ButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-full border-2 border-slate-900 px-5 py-1 text-sm font-normal text-slate-900 sm:border-4 sm:px-8 sm:py-4 sm:text-2xl dark:border-white dark:text-white"
    >
      {title}
    </Link>
  );
}
