import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { issueTypes } from "../../utils/constants";

export const IssueTypeSelect = (props: IssueTypeSelectProps) => {
  const { filter, onFilterChange } = props;
  const issueTypesOptions = issueTypes.map((type) => ({
    value: type,
    label: type,
  }));
  return (
    <Select value={filter} onValueChange={onFilterChange}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder="Select an issue type" />
      </SelectTrigger>
      <SelectContent className="max-h-64 overflow-y-auto">
        <SelectItem value="all">All Types</SelectItem>
        {issueTypesOptions?.map((issueType) => (
          <SelectItem key={issueType.value} value={issueType.value}>
            {issueType.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface IssueTypeSelectProps {
  filter: string;
  onFilterChange: (value: string) => void;
}
