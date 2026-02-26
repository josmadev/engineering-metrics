export type Issue = {
  key: string;
  type: string;
  summary: string;
  closedSprints: number;
  status: string;
  storyPoints: number;
  assignedTo: string;
  timeSpend: string; // ISO 8601 duration format, e.g., "PT8H30M"
  productIssueKey: string;
};

export type Sprint = {
  id: number;
  name: string;
};

export type SprintStates = "ACTIVE" | "FUTURE" | "CLOSED";
