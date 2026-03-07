import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { statusColors } from "../../utils/constants";

export const IssueStatusSelect = (props: IssueStatusSelectProps) => {
  const { filter, onFilterChange } = props;
  const statusOptions = Object.keys(statusColors).map((status) => ({
    value: status,
    label: status,
  }));
  return (
    <Select value={filter} onValueChange={onFilterChange}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder="Select an issue status" />
      </SelectTrigger>
      <SelectContent className="max-h-64 overflow-y-auto">
        <SelectItem value="all">All Statuses</SelectItem>
        {statusOptions?.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface IssueStatusSelectProps {
  filter: string;
  onFilterChange: (value: string) => void;
}
