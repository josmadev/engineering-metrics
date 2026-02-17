import { QUERY_KEYS } from "@/lib/constants";
import { getSprints } from "@/services/Sprints/__mocks__/getSprints";
import { useQuery } from "@tanstack/react-query";

export const useSprintsQuery = () => {
  return useQuery<string[]>({
    queryKey: [QUERY_KEYS.SPRINT_SUMMARY],
    queryFn: getSprints,
  });
};
