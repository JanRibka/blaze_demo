type TTableColumn = {
  key: string;
  label: string;
  align?: "center" | "start" | "end";
  allowsSorting?: boolean;
  width?: number;
};

export default TTableColumn;
