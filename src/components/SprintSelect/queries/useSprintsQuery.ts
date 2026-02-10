import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getSprints } from "../services/__mocks__/sprints.service";

export const useSprintsQuery = () => {
  return useQuery<string[]>({
    queryKey: [QUERY_KEYS.SPRINT_SUMMARY],
    queryFn: getSprints,
  });
};
