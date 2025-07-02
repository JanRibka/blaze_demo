import { EventDTO } from "../dTOs/EventDTO";
import { PaginatedDTO } from "../dTOs/PaginatedDTO";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import {
  deleteEvent,
  getEventByIdEvent,
  getEventByTitle,
  getEventsByIdUserPaginated,
  insertEvent,
  updateEvent,
} from "../repositories/eventsRepository";
import { EventData } from "../types/data/eventData";
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

export async function attemptInsertEvent(idUser: string, eventData: EventData) {
  const event = await getEventByTitle(eventData.title, idUser);

  if (event) {
    throw new ConflictError();
  }

  return await insertEvent(idUser, eventData);
}

export async function attemptDeleteEvent(idEvent: number, idUser: string) {
  const unitGroup = await getEventByIdEvent(idEvent, idUser);

  if (!unitGroup) {
    throw new NotFoundError();
  }

  await deleteEvent(idEvent, idUser);
}

export async function attemptUpdateEvent(
  idEvent: number,
  idUser: string,
  eventData: EventData
) {
  let event = await getEventByTitle(eventData.title, idUser);

  if (event && event.idEvent !== idEvent) {
    throw new ConflictError();
  }

  event = await getEventByIdEvent(idEvent, idUser);

  if (!event) {
    throw new NotFoundError();
  }

  return await updateEvent(idEvent, idUser, eventData);
}
