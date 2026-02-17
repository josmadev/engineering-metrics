import { apiClient } from "@/lib/apiClient";
import type { Sprint, SprintStates } from "@/types/global";

export const getSprints = async (sprintStates: SprintStates[]) => {
  const team = localStorage.getItem("@engineering-metrics/team");

  const response = await apiClient.get<Sprint[]>(`/sprints`, {
    params: {
      name: team,
      sprintStates: sprintStates.join(","),
    },
  });
  return response.data;
};
