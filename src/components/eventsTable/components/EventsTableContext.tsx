"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import TTableSettings from "@/lib/types/TTableSettings";
import { SortDescriptor } from "@heroui/react";

type EventsTableContext = {
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (value: SortDescriptor) => void;
};

export const EventsTableContext = createContext<EventsTableContext | null>(
  null
);

type Props = {
  children: ReactNode;
};

export function EventsTableContextProvider({ children }: Props) {
  const defaultSettings: TTableSettings = {
    page: 1,
    pageSize: 10,
    sortDescriptor: { column: "", direction: "ascending" },
  };

  const [page, setPage] = useState<number>(defaultSettings.page);
  const [pageSize, setPageSize] = useState<number>(defaultSettings.pageSize);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    defaultSettings.sortDescriptor as SortDescriptor
  );

  return (
    <EventsTableContext.Provider
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        sortDescriptor,
        setSortDescriptor,
      }}
    >
      {children}
    </EventsTableContext.Provider>
  );
}

export function useEventsTableContext() {
  const context = useContext(EventsTableContext);
  if (!context) {
    throw new Error(
      "useEventsTableContext must be used within a EventsTableContextProvider"
    );
  }

  return context;
}
