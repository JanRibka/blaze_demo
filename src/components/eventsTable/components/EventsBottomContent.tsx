"use client";

import { memo, useCallback } from "react";

import { Pagination } from "@heroui/react";

import { useEventsTableContext } from "./EventsTableContext";

type Props = {
  pages: number;
  totalEvents: number;
};

const EventsBottomContent = memo(({ pages, totalEvents }: Props) => {
  const { page, setPage, pageSize, setPageSize } = useEventsTableContext();

  const onPageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function getEventCountLabel(): string {
    if (totalEvents === 1) return "událost";
    if (totalEvents < 5) return "události";
    return "událostí";
  }

  return (
    <div className="p-2 flex justify-center md:justify-between items-center">
      <span className="hidden md:block text-default-400 text-small">
        Celkem {totalEvents} {getEventCountLabel()}
      </span>

      {pages > 1 && page <= pages && (
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      )}

      <label className="hidden md:flex items-center text-default-400 text-small">
        Záznamů na stránku:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          value={pageSize}
          onChange={onPageSizeChange}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
    </div>
  );
});

EventsBottomContent.displayName = "EventsBottomContent";

export default EventsBottomContent;
