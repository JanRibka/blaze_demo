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
    } else if (
      typeof value === "object" &&
      value !== null &&
      "calendar" in value &&
      "era" in value &&
      "year" in value &&
      "month" in value &&
      "day" in value
    ) {
      // Optionally, refine this check to match DateValue's structure more closely
      return value;
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

export function toUTC(date: Date | string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Interpretuj jako český čas a převeď na UTC
  const isoString = dateObj.toISOString().slice(0, 19); // "2024-01-15T14:00:00"
  const czechTime = new Date(isoString); // Bez timezone

  // Převést přes Prague timezone
  const utcTime = new Date(
    czechTime.toLocaleString("sv-SE", {
      timeZone: "Europe/Prague",
    })
  );

  const offset = czechTime.getTime() - utcTime.getTime();
  return new Date(czechTime.getTime() + offset);
}
