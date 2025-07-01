import { prisma } from "@/config/prisma/prisma";
import { Event } from "@prisma/client";

import { PaginatedDTO } from "../dTOs/PaginatedDTO";
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

export async function insertEvent(event: Event): Promise<Event> {
  return await prisma.event.create({
    data: event,
  });
}

export async function updateEvent({
  idEvent,
  idUser,
  ...rest
}: Partial<Event> & Pick<Event, "idEvent" | "idUser">): Promise<void> {
  await prisma.event.update({
    where: {
      idEvent_idUser: {
        idEvent,
        idUser,
      },
    },
    data: {
      ...rest,
    },
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
