export interface UseEventsTableProps = {
  dataPromise: Promise<
    ActionResponseDTO<PaginatedDTO<UnitWithGroupInfoSummaryDTO>>
  >;
};

