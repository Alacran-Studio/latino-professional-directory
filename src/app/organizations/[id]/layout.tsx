export default function OrganizationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <main className="relative p-7">{children}</main>;
}
