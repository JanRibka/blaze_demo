import AuthError from "../errors/AuthError";
import UnauthorizedError from "../errors/UnauthorizedError";

export function getErrorMessageFromError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function getAuthErrorFromError<T>(error: unknown): {
  errorMessage: keyof T;
  isAuthError: boolean;
} {
  const isAuthError = error instanceof AuthError;
  let errorMessage: keyof T;

  if (isAuthError) {
    errorMessage = error.message as keyof T;
  } else {
    errorMessage = "" as keyof T;
  }

  return {
    errorMessage,
    isAuthError,
  };
}

export function handleApiError(error: unknown): Response {
  if (error instanceof UnauthorizedError) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const errorMessage = getErrorMessageFromError(error);

  return new Response(errorMessage || "Došlo k neznámé chybě", { status: 500 });
}
