import BackButton from "@/components/common/BackButton";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative p-7">
      <BackButton href="/events" label="Events" />
      {children}
    </main>
  );
}
