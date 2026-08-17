export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#141414] dark:bg-[#141414]">
      <div className="flex flex-col items-center gap-5">
        <div
          className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-100 dark:border-neutral-800 border-t-[#FF4D00]"
          aria-hidden
        />
        <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-medium tracking-wide text-gray-500 dark:text-neutral-400 dark:text-neutral-500">
          Loading Next Solution…
        </p>
      </div>
    </div>
  );
}
