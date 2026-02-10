import { apiClient } from "@/lib/apiClient";

export const getSprints = async () => {
  const team = localStorage.getItem("@engineering-metrics/team");
  const response = await apiClient.get(`/sprints?name=${team}`);
  return response.data;
};
