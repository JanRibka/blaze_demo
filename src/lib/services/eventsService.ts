import { EventDTO } from "../dTOs/EventDTO";
import { PaginatedDTO } from "../dTOs/PaginatedDTO";
import { getEventsByIdUserPaginated } from "../repositories/eventsRepository";
import { PaginatedData } from "../types/data/paginatedData";

export async function getUserEvents(
  idUser: string,
  paginatedData: PaginatedData
): Promise<PaginatedDTO<EventDTO>> {
  const paginatedEvents = await getEventsByIdUserPaginated(
    idUser,
    paginatedData
  );

  const items = paginatedEvents.items.map((item) => {
    return {
      idEvent: item.idEvent,
      title: item.title,
      description: item.description,
      startAt: item.startAt,
      endAt: item.endAt,
      location: item.location,
      createdAt: item.createdAt,
      idUser: item.idUser,
    } satisfies EventDTO;
  });

  return { items, totalCount: paginatedEvents.totalCount };
}
