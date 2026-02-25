import { apiClient } from "@/lib/apiClient";
import type { Sprint, SprintStates } from "@/types/global";

export const getSprints = async (
  team: "FSE" | "BSE",
  sprintStates: SprintStates[],
) => {
  const response = await apiClient.get<Sprint[]>(`/sprints`, {
    params: {
      projectKey: team,
      sprintStates: sprintStates.join(","),
    },
  });
  return response.data;
};
