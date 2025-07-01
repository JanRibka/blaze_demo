import TTableSettings from "../types/TTableSettings";

export function loadTableSettings(
  gridName: string,
  defaultValue: TTableSettings = {
    page: 1,
    pageSize: 10,
    sortDescriptor: { column: "", direction: "ascending" },
  }
): TTableSettings {
  if (typeof window === "undefined") return defaultValue;

  try {
    const raw = localStorage.getItem(gridName);
    const allSettings = raw ? JSON.parse(raw) : defaultValue;

    return {
      ...allSettings,
      visibleColumns: new Set(allSettings.visibleColumns),
    };
  } catch (err) {
    console.error("Error loading table settings:", err);
    return defaultValue;
  }
}

export function saveTableSettings(gridName: string, settings: TTableSettings) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(gridName, JSON.stringify(settings));
  } catch (err) {
    console.error("Error saving table settings:", err);
  }
}
