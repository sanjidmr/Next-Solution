export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div
          className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-100 border-t-[#2563EB]"
          aria-hidden
        />
        <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-medium tracking-wide text-gray-500">
          Loading Next Solution…
        </p>
      </div>
    </div>
  );
}
