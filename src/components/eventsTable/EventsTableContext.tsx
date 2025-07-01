"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import TTableSettings from "@/lib/types/TTableSettings";
import {
  loadTableSettings,
  saveTableSettings,
} from "@/lib/utils/tableSettings";
import { SortDescriptor } from "@heroui/react";

import { GRID_NAME } from "./gridName";

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
  const firstRender = useIsFirstRender();

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

  useEffect(() => {
    const settings = loadTableSettings(GRID_NAME, defaultSettings);

    setPage(settings.page);
    setPageSize(settings.pageSize);
    setSortDescriptor(settings.sortDescriptor as SortDescriptor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender) return;

    saveTableSettings(GRID_NAME, {
      page,
      pageSize,
      sortDescriptor,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

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
