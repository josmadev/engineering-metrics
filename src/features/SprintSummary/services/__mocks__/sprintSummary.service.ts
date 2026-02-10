export const getSprintSummary = async (_sprint: string | null) => {
  if (!_sprint) {
    return Promise.resolve([]);
  }
  return Promise.resolve([
    {
      issueKey: "FSE-123",
      issueProductKey: "PROD-123",
      type: "Task",
      summary: "Summary 1",
      closedSprints: 1,
      status: "To Do",
      storyPoints: 1,
      assignee: "Jose Manuel",
      timeSpent: 100,
    },
    {
      issueKey: "FSE-124",
      issueProductKey: "PROD-124",
      type: "History",
      summary: "Summary 2",
      closedSprints: 1,
      status: "To Do",
      storyPoints: 1,
      assignee: "Jose Manuel",
      timeSpent: 100,
    },
    {
      issueKey: "FSE-125",
      issueProductKey: "PROD-125",
      type: "Task",
      summary: "Summary 3",
      closedSprints: 1,
      status: "To Do",
      storyPoints: 1,
      assignee: "Jose Manuel",
      timeSpent: 100,
    },
  ]);
};
