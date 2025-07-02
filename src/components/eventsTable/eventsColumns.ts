import TTableColumn from "@/lib/types/TTableColumn";

const eventsColumns: TTableColumn[] = [
  {
    label: "Nadpis",
    key: "title",
    allowsSorting: true,
  },
  {
    label: "Začátek",
    key: "startAt",
    allowsSorting: false,
  },
  {
    label: "Konec",
    key: "endAt",
    allowsSorting: false,
  },
  {
    label: "Akce",
    key: "actions",
    width: 100,
  },
];

export default eventsColumns;
