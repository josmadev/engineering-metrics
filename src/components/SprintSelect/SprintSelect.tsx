import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select/Select";
import { useSprintsQuery } from "./queries/useSprintsQuery";

const SprintSelect: React.FC<ISprintSelect> = ({ sprintId, setSprintId }) => {
  const { data: sprints } = useSprintsQuery();

  return (
    <Select
      value={sprintId ?? undefined}
      onValueChange={(value) => setSprintId(value)}
    >
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder="Select a sprint" />
      </SelectTrigger>
      <SelectContent className="max-h-64 overflow-y-auto">
        {sprints?.map((sprint) => (
          <SelectItem key={sprint} value={sprint}>
            Sprint {sprint}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface ISprintSelect {
  sprintId: string | null;
  setSprintId: (sprintId: string | null) => void;
}

export default SprintSelect;
