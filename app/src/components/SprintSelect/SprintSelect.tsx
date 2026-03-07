import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select/Select";
import { useSprintsQuery } from "./queries/useSprintsQuery";

export const SprintSelect = () => {
  const { data: sprints } = useSprintsQuery();

  const sprintId = useSearch({ from: "/sprint-summary" }).sprintId;

  const navigate = useNavigate({ from: "/sprint-summary" });

  return (
    <Select
      value={sprintId?.toString() ?? undefined}
      onValueChange={(value) => {
        navigate({
          to: "/sprint-summary",
          search: { sprintId: Number(value) },
        });
      }}
    >
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder="Select a sprint" />
      </SelectTrigger>
      <SelectContent className="max-h-64 overflow-y-auto">
        {sprints?.map((sprint) => (
          <SelectItem key={sprint.id} value={sprint.id.toString()}>
            {sprint.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
