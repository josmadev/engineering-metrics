import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/Table";
import { useSprintsQuery } from "../../queries/useSprintsQuery";
import { formatWorkTime } from "@/lib/formatWorkTime";
import { Badge } from "@/components/Badge/Badge";
import { getStatusStyles } from "../../utils/getStatusStyles";
import { useMemo, useState } from "react";
import { SprintSummaryTableFilters } from "../SprintSummaryTableFilters/SprintSummaryTableFilters";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button/button";

export const SprintSummaryTable = () => {
  const sprintId = useSearch({ from: "/sprint-summary" }).sprintId;

  const { data: sprintSummary } = useSprintsQuery(sprintId);

  const [filters, setFilters] = useState({
    issueType: "",
    status: "",
    assignee: "",
  });

  if (!sprintId) return null;

  if (!sprintSummary) {
    return <div>No sprint summary found</div>;
  }

  const filteredSummary = useMemo(() => {
    return sprintSummary.filter((issue) => {
      const matchesIssueType =
        filters.issueType && filters.issueType !== "all"
          ? issue.type === filters.issueType
          : true;
      const matchesStatus =
        filters.status && filters.status !== "all"
          ? issue.status === filters.status
          : true;
      const matchesAssignee =
        filters.assignee && filters.assignee !== "all"
          ? issue.assignedTo === filters.assignee
          : true;

      return matchesIssueType && matchesStatus && matchesAssignee;
    });
  }, [sprintSummary, filters]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SprintSummaryTableFilters filters={filters} setFilters={setFilters} />
        <Button variant="default">See Metrics</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="[&_th]:text-center">
            <TableHead>Issue Key</TableHead>
            <TableHead>Issue Product Key</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Closed Sprints</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Story Points</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Time Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSummary.map((issue) => (
            <TableRow key={issue.key} className="[&_td]:text-center">
              <TableCell>
                <a
                  href={`https://aleaplay.atlassian.net/browse/${issue.key}`}
                  target="_blank"
                  className="font-medium hover:underline"
                >
                  {issue.key}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={`https://aleaplay.atlassian.net/browse/${issue.productIssueKey}`}
                  target="_blank"
                  className="font-medium hover:underline"
                >
                  {issue.productIssueKey}
                </a>
              </TableCell>
              <TableCell>{issue.type}</TableCell>
              <TableCell className="max-w-xs truncate">
                {issue.summary}
              </TableCell>
              <TableCell>{issue.closedSprints}</TableCell>
              <TableCell>
                <Badge
                  text={issue.status}
                  bgColor={getStatusStyles(issue.status).bg}
                  textColor={getStatusStyles(issue.status).text}
                  borderColor={getStatusStyles(issue.status).border}
                />
              </TableCell>
              <TableCell>{issue.storyPoints}</TableCell>
              <TableCell>
                {issue.assignedTo ? (
                  <Badge
                    text={issue.assignedTo}
                    bgColor="#f1f5f9"
                    textColor="#475569"
                    borderColor="#cbd5e1"
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{formatWorkTime(issue.timeSpend)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

interface SprintSummaryTableProps {
  sprintId: number | null;
}
