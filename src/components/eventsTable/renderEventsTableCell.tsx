import { Key } from "react";

import { EventDTO } from "@/lib/dTOs/EventDTO";

import TableCellActions from "../tableCellActions/TableCellActions";
import TableCellDate from "../tableCellDate/TableCellDate";

type WithActionsColumn = keyof EventDTO | "actions";

export function renderEventTableCell(
  event: EventDTO,
  columnKey: Key,
  onEdit: (event: EventDTO) => void,
  onDelete: (event: EventDTO) => void
) {
  const cellValue = event[columnKey as keyof EventDTO];

  switch (columnKey as WithActionsColumn) {
    case "actions":
      return (
        <TableCellActions
          editLabel="Editovat událost"
          onEdit={() => onEdit(event)}
          deleteLabel="Smazat událost"
          onDelete={() => onDelete(event)}
        />
      );
    case "startAt":
    case "endAt":
      return <TableCellDate date={cellValue as Date | null} />;

    default:
      return cellValue?.toString() ?? "";
  }
}
