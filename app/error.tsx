"use client";

import { useEffect } from "react";
import { normalizeError } from "@/lib/error-utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const normalized = normalizeError(error);

  useEffect(() => {
    console.error("Runtime error:", normalized);
  }, [normalized]);

  const errorMessage = normalized.message;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#141414] dark:bg-[#141414] px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold tracking-[0.2em] text-[#FF4D00] uppercase">
          Something went wrong
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          We hit an unexpected error
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-neutral-400 dark:text-neutral-500">
          {errorMessage}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#FF4D00] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D00]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
