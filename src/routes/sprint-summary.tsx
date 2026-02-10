import SprintSummaryView from "@/features/SprintSummary/views";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sprint-summary")({
  component: SprintSummary,
});

function SprintSummary() {
  return <SprintSummaryView />;
}
