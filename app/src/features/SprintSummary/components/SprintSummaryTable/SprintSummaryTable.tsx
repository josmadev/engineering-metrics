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
import { Link } from "@tanstack/react-router";

export const SprintSummaryTable = ({ sprintId }: SprintSummaryTableProps) => {
  const { data: sprintSummary } = useSprintsQuery(sprintId);

  if (!sprintId) return null;

  if (!sprintSummary) {
    return <div>No sprint summary found</div>;
  }

  return (
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
        {sprintSummary.map((issue) => (
          <TableRow key={issue.key} className="[&_td]:text-center">
            <TableCell>
              <a
                href={`https://aleaplay.atlassian.net/browse/${issue.key}`}
                target="_blank"
                className="text-blue-700 font-medium hover:underline"
              >
                {issue.key}
              </a>
            </TableCell>
            <TableCell>
              <a
                href={`https://aleaplay.atlassian.net/browse/${issue.productIssueKey}`}
                target="_blank"
                className="text-blue-700 font-medium hover:underline"
              >
                {issue.productIssueKey}
              </a>
            </TableCell>
            <TableCell>{issue.type}</TableCell>
            <TableCell className="max-w-xs truncate">{issue.summary}</TableCell>
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
  );
};

interface SprintSummaryTableProps {
  sprintId: number | null;
}
