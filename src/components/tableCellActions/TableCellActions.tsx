import { HTMLAttributes } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import { cn } from "@/lib/utils/styles";
import { Tooltip } from "@heroui/react";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  hideEdit?: boolean;
  editLabel?: string;
  onEdit?: () => void;

  hideDelete?: boolean;
  deleteLabel?: string;
  onDelete?: () => void;
};

export default function TableCellActions({
  className,
  hideEdit,
  editLabel,
  onEdit,
  hideDelete,
  deleteLabel,
  onDelete,
  ...restProps
}: Props) {
  return (
    <div
      className={cn("relative flex items-center gap-2", className)}
      {...restProps}
    >
      {!hideEdit && (
        <Tooltip content={editLabel ?? "Editovat"}>
          <button
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onEdit}
          >
            <CiEdit />
          </button>
        </Tooltip>
      )}

      {!hideDelete && (
        <Tooltip color="danger" content={deleteLabel ?? "Smazat"}>
          <button
            className="text-lg text-danger cursor-pointer active:opacity-50"
            onClick={onDelete}
          >
            <MdDeleteOutline />
          </button>
        </Tooltip>
      )}
    </div>
  );
}
