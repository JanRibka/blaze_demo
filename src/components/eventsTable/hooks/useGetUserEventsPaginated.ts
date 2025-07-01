"use client";

import { useEffect, useState } from "react";

import { EventDTO } from "@/lib/dTOs/EventDTO";
import { PaginatedDTO } from "@/lib/dTOs/PaginatedDTO";
import { logConsoleError } from "@/lib/utils/console";
import { addToast, SortDescriptor } from "@heroui/react";

export default function useGetUserEventsPaginated(
  page: number,
  pageSize: number,
  sortDescriptor: SortDescriptor
) {
  const [data, setData] = useState<PaginatedDTO<EventDTO>>({
    items: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUserEvents() {
    if (!isLoading) setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (sortDescriptor.column) {
        params.append("orderByField", sortDescriptor.column.toString());

        if (sortDescriptor.direction === "ascending") {
          params.append("orderDirection", "asc");
        } else if (sortDescriptor.direction === "descending") {
          params.append("orderDirection", "desc");
        }
      }

      const response = await fetch(`/api?${params}`);

      if (!response.ok) {
        addToast({
          title: "Chyba",
          description: response.statusText,
          color: "danger",
        });
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      logConsoleError(error, { consoleErrorTitle: "GetUserEvents" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sortDescriptor.column, sortDescriptor.direction]);

  function refetch() {
    fetchUserEvents();
  }

  return { data, isLoading, refetch };
}
