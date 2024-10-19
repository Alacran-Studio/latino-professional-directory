import Link from "next/link";

interface ButtonProps {
  href: string;
  title: string;
}
// DEPRECATED. USE `@/components/common/Button` INSTEAD.
export default function Button({ href, title }: ButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-blue-600 sm:px-8 sm:py-4 sm:text-2xl"
    >
      {title}
    </Link>
  );
}
