import { apiClient } from "@/lib/apiClient";
import type { Issue } from "@/types/global";

export const getSprintSummary = async (sprint: string | null) => {
  if (!sprint) {
    throw new Error("Sprint is required");
  }
  const response = await apiClient.get<Issue[]>(`/sprints/${sprint}/issues`);
  return response.data;
};
