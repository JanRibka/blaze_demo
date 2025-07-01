export function getPages(totalCount: number, pageSize: number): number {
  return Math.ceil((totalCount || 0) / pageSize);
}
