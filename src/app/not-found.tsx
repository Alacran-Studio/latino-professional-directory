import LinkButton from "@/components/common/LinkButton";
import Link from "next/link";

const title = "Something's missing.";
const body =
  "Sorry, we can't find that page. You'll find lots to explore on the home page.";

export default function NotFound() {
  return (
    <section className="flex h-full flex-row">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-accent md:text-4xl">
            {title}
          </p>
          <p className="mb-6 text-lg font-light text-secondary-foreground">
            {body}
          </p>
          <div className="py-10">
            <LinkButton href="/" title="Back to Homepage" />
          </div>
        </div>
      </div>
    </section>
  );
}
