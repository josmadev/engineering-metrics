import { QUERY_KEYS } from "@/lib/constants";
import type { ISprint } from "@/types/global";
import { getSprintSummary } from "../services/__mocks__/sprintSummary.service";
import { useQuery } from "@tanstack/react-query";

export const useSprintsQuery = (sprintId: string | null) => {
  return useQuery<ISprint[]>({
    queryKey: [QUERY_KEYS.SPRINT_SUMMARY, sprintId],
    queryFn: () => getSprintSummary(sprintId),
    enabled: !!sprintId,
  });
};
