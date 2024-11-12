import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-row bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-white lg:text-9xl">
            404
          </h1>
          <p className="text-accent mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <div className="py-10">
            <Link
              href="/"
              className="rounded-xl bg-blue-500 px-8 py-4 text-center text-2xl text-white transition-all duration-200 hover:bg-blue-600"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
