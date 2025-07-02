import { prisma } from "@/config/prisma/prisma";
import { Event } from "@prisma/client";

import { PaginatedDTO } from "../dTOs/PaginatedDTO";
import { EventData } from "../types/data/eventData";
import { PaginatedData } from "../types/data/paginatedData";

export async function getEventsByIdUserPaginated(
  idUser: string,
  paginatedData: PaginatedData
): Promise<PaginatedDTO<Event>> {
  const skip = (paginatedData.page - 1) * paginatedData.pageSize;
  const orderBy =
    paginatedData.orderByField && paginatedData.orderDirection
      ? {
          [paginatedData.orderByField]: paginatedData.orderDirection,
        }
      : undefined;

  const [events, totalCount] = await Promise.all([
    prisma.event.findMany({
      skip,
      take: paginatedData.pageSize,
      orderBy,
      where: {
        idUser: idUser,
      },
    }),

    prisma.event.count({
      where: {
        idUser: idUser,
      },
    }),
  ]);

  return { items: events, totalCount };
}

export async function getEventByTitle(
  title: string,
  idUser: string
): Promise<Event | null> {
  return await prisma.event.findFirst({
    where: {
      title: title,
      idUser: idUser,
    },
  });
}

export async function getEventByIdEvent(
  idEvent: number,
  idUser: string
): Promise<Event | null> {
  return await prisma.event.findFirst({
    where: {
      idEvent: idEvent,
      idUser: idUser,
    },
  });
}

export async function insertEvent(
  idUser: string,
  eventData: EventData
): Promise<Event> {
  return await prisma.event.create({
    data: {
      idUser,
      ...eventData,
    },
  });
}

export async function updateEvent(
  idEvent: number,
  idUser: string,
  eventData: EventData
): Promise<void> {
  await prisma.event.update({
    where: {
      idEvent_idUser: {
        idEvent,
        idUser,
      },
    },
    data: eventData,
  });
}

export async function deleteEvent(
  idEvent: number,
  idUser: string
): Promise<void> {
  await prisma.event.delete({
    where: {
      idEvent_idUser: {
        idEvent,
        idUser,
      },
    },
  });
}
