import { AssigneeSelect } from "../AssigneeSelect/AssigneeSelect";
import { IssueStatusSelect } from "../IssueStatusSelect/IssueStatusSelect";
import { IssueTypeSelect } from "../IssueTypeSelect/IssueTypeSelect";

export const SprintSummaryTableFilters = (
  props: SprintSummaryTableFiltersProps,
) => {
  return (
    <div className="flex flex-1 flex-wrap gap-4">
      <IssueTypeSelect
        filter={props.filters.issueType}
        onFilterChange={(value) =>
          props.setFilters({ ...props.filters, issueType: value })
        }
      />
      <IssueStatusSelect
        filter={props.filters.status}
        onFilterChange={(value) =>
          props.setFilters({ ...props.filters, status: value })
        }
      />
      <AssigneeSelect
        filter={props.filters.assignee}
        onFilterChange={(value) =>
          props.setFilters({ ...props.filters, assignee: value })
        }
      />
    </div>
  );
};

interface SprintSummaryTableFiltersProps {
  filters: {
    issueType: string;
    status: string;
    assignee: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      issueType: string;
      status: string;
      assignee: string;
    }>
  >;
}
