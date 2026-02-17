import { QUERY_KEYS } from "@/lib/constants";
import { getSprintSummary } from "@/services/Sprints/__mocks__/getSprintSummary";
import type { Issue } from "@/types/global";
import { useQuery } from "@tanstack/react-query";

export const useSprintsQuery = (sprintId: string | null) => {
  return useQuery<Issue[]>({
    queryKey: [QUERY_KEYS.SPRINT_SUMMARY, sprintId],
    queryFn: () => getSprintSummary(sprintId),
    enabled: !!sprintId,
  });
};
