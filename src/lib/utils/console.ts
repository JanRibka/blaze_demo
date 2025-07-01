import TLogConsoleErrorOptions from "../types/TLogConsoleErrorOptions";

export function logConsoleError(
  error: unknown,
  options: TLogConsoleErrorOptions = {}
) {
  const { logConsoleErrorEnable = true, consoleErrorTitle = "Chyba:" } =
    options;

  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== "production" &&
    logConsoleErrorEnable
  ) {
    console.error(consoleErrorTitle, error);
  }
}
