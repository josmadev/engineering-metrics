import SprintMetrics from "@/features/SprintMetrics/views";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const sprintSummarySearchSchema = z.object({
  sprintId: z.number().optional(),
});

export const Route = createFileRoute("/sprint-metrics")({
  component: RouteComponent,
  validateSearch: (search) => sprintSummarySearchSchema.parse(search),
});

function RouteComponent() {
  return <SprintMetrics />;
}
