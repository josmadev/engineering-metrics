import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { useSprintSummaryQuery } from "../../../../queries/useSprintSummaryQuery";
import { useSearch } from "@tanstack/react-router";

export const AssigneeSelect = (props: AssigneeSelectProps) => {
  const { filter, onFilterChange } = props;

  const sprintId = useSearch({ from: "/sprint-summary" }).sprintId;

  const { data } = useSprintSummaryQuery(sprintId);

  const getAssigneesFromList = () => {
    if (!data) return [];
    const assigneesSet = new Set<string>();
    data.forEach((issue) => {
      if (issue.assignedTo) {
        assigneesSet.add(issue.assignedTo);
      }
    });
    return Array.from(assigneesSet);
  };

  return (
    <Select value={filter} onValueChange={onFilterChange}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder="Select an issue status" />
      </SelectTrigger>
      <SelectContent className="max-h-64 overflow-y-auto">
        <SelectItem value="all">All Assignees</SelectItem>
        {getAssigneesFromList().map((assignee) => (
          <SelectItem key={assignee} value={assignee}>
            {assignee}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface AssigneeSelectProps {
  filter: string;
  onFilterChange: (value: string) => void;
}
