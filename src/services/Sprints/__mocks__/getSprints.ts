import type { Sprint, SprintStates } from "@/types/global";

export const getSprints = async (
  sprintStates: SprintStates[],
): Promise<Sprint[]> => {
  let response: Sprint[] = [];
  if (sprintStates.includes("ACTIVE")) {
    response = [
      ...response,
      {
        id: 123,
        name: "FSE_2025_W01_W02",
      },
    ];
  }

  if (sprintStates.includes("CLOSED")) {
    response = [
      ...response,
      {
        id: 345,
        name: "FSE_2025_W04_W05",
      },
    ];
  }

  if (sprintStates.includes("FUTURE")) {
    response = [
      ...response,
      {
        id: 657,
        name: "FSE_2025_W12_W13",
      },
    ];
  }

  return Promise.resolve(response);
};
