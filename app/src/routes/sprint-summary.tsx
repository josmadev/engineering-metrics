import SprintSummaryView from "@/features/SprintSummary/views";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const sprintSummarySearchSchema = z.object({
  sprintId: z.number().optional(),
});

export const Route = createFileRoute("/sprint-summary")({
  component: SprintSummary,
  validateSearch: (search) => sprintSummarySearchSchema.parse(search),
});

function SprintSummary() {
  return <SprintSummaryView />;
}
