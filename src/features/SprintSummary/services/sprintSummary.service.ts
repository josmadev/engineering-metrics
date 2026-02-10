import { apiClient } from "@/lib/apiClient";

export const getSprintSummary = async (sprint: string | null) => {
  if (!sprint) {
    throw new Error("Sprint is required");
  }
  const response = await apiClient.get(`/sprints/${sprint}/issues`);
  return response.data;
};
