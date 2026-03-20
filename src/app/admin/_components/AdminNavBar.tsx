import Link from "next/link";
import { FullBrand } from "@/components/common/FullBrand";

export function AdminNavBar() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border bg-brand px-4">
      <Link href="/" className="flex items-center">
        <FullBrand fillColor="var(--logo-line)" />
      </Link>
    </header>
  );
}
