import { format, isDate } from "date-fns";

import { DateValue } from "@heroui/react";
import { parseDateTime } from "@internationalized/date";

export const parseDateTimeToDateValue = (
  value: string | Date
): DateValue | null => {
  if (!value) {
    return null;
  }

  try {
    let date: Date;

    // Pokud je vstup Date objekt
    if (value instanceof Date) {
      if (isNaN(value.getTime())) {
        return null;
      }
      date = value;
    }
    // Pokud je vstup string
    else if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) {
        return null;
      }
      date = new Date(trimmed);
      if (isNaN(date.getTime())) {
        return null;
      }
    } else {
      return null;
    }

    // Vytvoř ISO string s časem ve formátu YYYY-MM-DDTHH:mm:ss
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const dateTimeString = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}T${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return parseDateTime(dateTimeString);
  } catch {
    return null;
  }
};

export const formatDateTime = (
  date: Date | string | null,
  pFormat: string = "yyyy.MM.dd HH:mm"
): string => {
  if (date === null) return "";

  if (typeof date === "string") {
    date = new Date(date);
  }

  if (!isDate(date)) return "";

  return format(date, pFormat);
};
