import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#141414] dark:bg-[#141414] px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="font-[family-name:var(--font-space-grotesk)] text-6xl font-bold tracking-tight text-[#FF4D00]">
          404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-neutral-400 dark:text-neutral-500">
          The page you are looking for does not exist or has moved. Head back
          to the homepage to keep exploring Next Solution.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#FF4D00] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D00]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
