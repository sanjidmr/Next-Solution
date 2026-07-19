export function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);
  if (error && typeof error === "object") {
    if ("message" in error && typeof (error as Record<string, unknown>).message === "string") {
      return new Error((error as Record<string, unknown>).message as string);
    }
    if ("reason" in error && typeof (error as Record<string, unknown>).reason === "string") {
      return new Error((error as Record<string, unknown>).reason as string);
    }
  }
  return new Error("An unexpected error occurred. Please try again.");
}
