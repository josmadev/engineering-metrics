import type { Issue } from "@/types/global";

export const getSprintSummary = async (
  _sprint: string | null,
): Promise<Issue[]> => {
  if (!_sprint) {
    return Promise.resolve([]);
  }
  return Promise.resolve([
    {
      key: "FSE-123",
      productIssueKey: "PROD-123",
      type: "Task",
      summary: "Summary 1",
      closedSprints: 1,
      status: "To Do",
      storyPoints: 1,
      assigneeTo: "Jose Manuel",
      timeSpent: 100,
    },
    {
      key: "FSE-124",
      productIssueKey: "PROD-124",
      type: "History",
      summary: "Summary 2",
      closedSprints: 1,
      status: "To Do",
      storyPoints: 1,
      assigneeTo: "Jose Manuel",
      timeSpent: 100,
    },
    {
      key: "FSE-125",
      productIssueKey: "PROD-125",
      type: "Task",
      summary: "Summary 3",
      closedSprints: 1,
      status: "To Do",
      storyPoints: 1,
      assigneeTo: "Jose Manuel",
      timeSpent: 100,
    },
  ]);
};
