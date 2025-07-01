"use client";

import { useMemo } from "react";

import { getPages } from "@/lib/utils/table";
import { SortDescriptor } from "@heroui/react";

import useGetUserEventsPaginated from "./useGetUserEventsPaginated";

export default function useEventsTable(
  page: number,
  pageSize: number,
  sortDescriptor: SortDescriptor
) {
  const { data, isLoading, refetch } = useGetUserEventsPaginated(
    page,
    pageSize,
    sortDescriptor
  );

  const pages = useMemo(
    () => getPages(data.totalCount, pageSize),
    [data.totalCount, pageSize]
  );

  return { data, isLoading, pages, refetch };
}
