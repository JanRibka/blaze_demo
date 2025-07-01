import { SortDescriptor } from "@heroui/react";

type TTableSettings = {
  page: number;
  pageSize: number;
  sortDescriptor?: SortDescriptor;
};

export default TTableSettings;
