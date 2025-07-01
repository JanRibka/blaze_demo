import TTableColumn from "@/lib/types/TTableColumn";

const allUsersColumns: TTableColumn[] = [
  {
    label: "Nadpis",
    key: "title",
    allowsSorting: true,
  },
  {
    label: "Začíná",
    key: "startAt",
    allowsSorting: true,
  },
  {
    label: "Končí",
    key: "endAt",
    allowsSorting: true,
  },
  {
    label: "Akce",
    key: "actions",
  },
];

export default allUsersColumns;
