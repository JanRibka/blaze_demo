import AuthError from "../errors/AuthError";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
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

export function getConflictErrorFromError(
  error: unknown,
  overrideMessage?: string
): {
  isConflictError: boolean;
  errorMessage: string;
} {
  const isConflictError = error instanceof ConflictError;
  let errorMessage: string;

  if (isConflictError) {
    errorMessage = overrideMessage ?? error.message;
  } else {
    errorMessage = "";
  }

  return {
    errorMessage,
    isConflictError,
  };
}

export function getNotFoundErrorFromError(
  error: unknown,
  overrideMessage?: string
): {
  isNotFoundError: boolean;
  errorMessage: string;
} {
  const isNotFoundError = error instanceof NotFoundError;
  let errorMessage: string;

  if (isNotFoundError) {
    errorMessage = overrideMessage ?? error.message;
  } else {
    errorMessage = "";
  }

  return {
    errorMessage,
    isNotFoundError,
  };
}
