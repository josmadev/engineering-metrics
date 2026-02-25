import { QUERY_KEYS } from "@/lib/constants";
import { useTeam } from "@/providers/TeamProvider/TeamProvider";
import { getSprints } from "@/services/Sprints/getSprints";
import type { Sprint } from "@/types/global";
import { useQuery } from "@tanstack/react-query";

export const useSprintsQuery = () => {
  const { team } = useTeam();
  return useQuery<Sprint[]>({
    queryKey: [QUERY_KEYS.SPRINT_SUMMARY, team],
    queryFn: () => getSprints(team, ["ACTIVE", "FUTURE"]),
    enabled: !!team,
  });
};
