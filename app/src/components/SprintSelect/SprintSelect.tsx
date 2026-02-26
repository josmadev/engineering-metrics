import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select/Select";
import { useSprintsQuery } from "./queries/useSprintsQuery";

export const SprintSelect = ({ sprintId, setSprintId }: SprintSelectProps) => {
  const { data: sprints } = useSprintsQuery();

  return (
    <Select
      value={sprintId?.toString() ?? undefined}
      onValueChange={(value) => setSprintId(Number(value))}
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

interface SprintSelectProps {
  sprintId: number | null;
  setSprintId: (sprintId: number | null) => void;
}
