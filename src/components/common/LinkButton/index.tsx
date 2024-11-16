import Link from "next/link";

interface ButtonProps {
  href: string;
  title: string;
}
export default function LinkButton({ href, title }: ButtonProps) {
  return (
    <Link
      href={href}
      className="hover:bg-primary-hover rounded-xl bg-primary px-4 py-2 text-sm text-white transition-all duration-200 sm:px-8 sm:py-4 sm:text-2xl"
    >
      {title}
    </Link>
  );
}
