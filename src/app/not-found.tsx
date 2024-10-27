import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mb-4 flex w-10/12 flex-col items-center pb-4 pt-8">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </section>
  );
}
