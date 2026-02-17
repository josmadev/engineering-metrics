export type Issue = {
  key: string;
  type: string;
  summary: string;
  closedSprints: number;
  status: string;
  storyPoints: number;
  assigneeTo: string;
  timeSpent: number;
  productIssueKey: string;
};

export type Sprint = {
  id: number;
  name: string;
};

export type SprintStates = "ACTIVE" | "FUTURE" | "CLOSED";
