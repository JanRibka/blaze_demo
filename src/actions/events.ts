"use server";

import { requireAuth } from "@/lib/auth/session";
import { ActionResponseDTO } from "@/lib/dTOs/ActionResponseDTO";
import {
  attemptDeleteEvent,
  attemptInsertEvent,
  attemptUpdateEvent,
} from "@/lib/services/eventsService";
import { toUTC } from "@/lib/utils/date";
import {
  getConflictErrorFromError,
  getErrorMessageFromError,
  getNotFoundErrorFromError,
} from "@/lib/utils/error";
import { nameof } from "@/lib/utils/nameof";
import eventActionValidator from "@/lib/validations/actionValidators/eventActionValidator";
import { TEventForm } from "@/lib/validations/schemas/eventFormValidationSchema";
import { Event } from "@prisma/client";

export async function insertEventAction(
  formData: FormData
): Promise<ActionResponseDTO<Event>> {
  const { session } = await requireAuth();

  try {
    const validationResult = await eventActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: new Date().getTime(),
      };
    }

    const title = formData.get(nameof<TEventForm>("title")) as string;
    const description = formData.get(
      nameof<TEventForm>("description")
    ) as string;
    const startAt = formData.get(nameof<TEventForm>("startAt")) as string;
    const endAt = formData.get(nameof<TEventForm>("endAt")) as string;
    const location = formData.get(nameof<TEventForm>("location")) as string;

    const event = await attemptInsertEvent(session?.user?.id ?? "", {
      title,
      description,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      location,
    });

    return {
      data: event,
      success: true,
      timeStamp: new Date().getTime(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Událost s názvem již existuje"
    );
    let errorMessage = conflictError.errorMessage;

    if (!conflictError.isConflictError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date().getTime(),
    };
  }
}

export async function deleteEventAction(
  idEvent: number
): Promise<ActionResponseDTO<undefined>> {
  const { session } = await requireAuth();

  try {
    await attemptDeleteEvent(idEvent, session?.user?.id ?? "");

    return {
      data: null,
      success: true,
      timeStamp: new Date().getTime(),
    };
  } catch (error) {
    const conflictError = getNotFoundErrorFromError(
      error,
      "Událost nelze smazat"
    );
    let errorMessage = conflictError.errorMessage;

    if (!conflictError.isNotFoundError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date().getTime(),
    };
  }
}

export async function updateEventAction(
  idEvent: number,
  formData: FormData
): Promise<ActionResponseDTO<undefined>> {
  const { session } = await requireAuth();

  try {
    const validationResult = await eventActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: new Date().getTime(),
      };
    }

    const title = formData.get(nameof<TEventForm>("title")) as string;
    const description = formData.get(
      nameof<TEventForm>("description")
    ) as string;
    const startAt = toUTC(
      formData.get(nameof<TEventForm>("startAt")) as string
    );
    const endAt = toUTC(formData.get(nameof<TEventForm>("endAt")) as string);
    const location = formData.get(nameof<TEventForm>("location")) as string;

    await attemptUpdateEvent(idEvent, session?.user?.id ?? "", {
      title,
      description,
      startAt: startAt,
      endAt: endAt,
      location: location ?? null,
    });

    return {
      data: undefined,
      success: true,
      timeStamp: new Date().getTime(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Událost s názvem již existuje"
    );

    let errorMessage = conflictError.errorMessage;

    const notFoundError = getNotFoundErrorFromError(
      error,
      "Událost neexistuje"
    );

    if (notFoundError.isNotFoundError) {
      errorMessage = notFoundError.errorMessage;
    } else if (
      !conflictError.isConflictError &&
      !notFoundError.isNotFoundError
    ) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date().getTime(),
    };
  }
}
