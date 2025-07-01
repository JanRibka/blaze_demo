import { requireAuth } from "@/lib/auth/session";
import { ActionResponseDTO } from "@/lib/dTOs/ActionResponseDTO";
import { EventDTO } from "@/lib/dTOs/EventDTO";
import { PaginatedDTO } from "@/lib/dTOs/PaginatedDTO";
import { getUserEvents } from "@/lib/services/eventsService";
import { PaginatedData } from "@/lib/types/data/paginatedData";
import { getErrorMessageFromError } from "@/lib/utils/error";

export async function getUserEventsAction(
  idUser: string,
  paginatedData: PaginatedData
): Promise<ActionResponseDTO<PaginatedDTO<EventDTO>>> {
  await requireAuth();

  try {
    const data = await getUserEvents(idUser, paginatedData);

    return {
      data: data,
      success: true,
      timeStamp: new Date().getTime(),
    };
  } catch (error) {
    const errorMessage = getErrorMessageFromError(error);

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: new Date().getTime(),
    };
  }
}
