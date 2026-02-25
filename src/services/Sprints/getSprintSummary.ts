import { apiClient } from "@/lib/apiClient";
import type { Issue } from "@/types/global";

export const getSprintSummary = async (sprintId: number | null) => {
  if (!sprintId) {
    throw new Error("Sprint is required");
  }
  const response = await apiClient.get<Issue[]>(`/sprints/${sprintId}/issues`);
  return response.data;
};
