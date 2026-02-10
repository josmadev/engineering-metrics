import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/Table";
import { useSprintsQuery } from "../../queries/useSprintsQuery";

const SprintSummaryTable: React.FC<ISprintSummaryTable> = ({ sprintId }) => {
  const { data: sprintSummary } = useSprintsQuery(sprintId);

  if (!sprintId) return null;

  if (!sprintSummary) {
    return <div>No sprint summary found</div>;
  }

  console.log(sprintSummary);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Issue Key</TableHead>
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
          <TableRow key={issue.issueKey}>
            <TableCell>{issue.issueKey}</TableCell>
            <TableCell>{issue.issueProductKey}</TableCell>
            <TableCell>{issue.type}</TableCell>
            <TableCell>{issue.summary}</TableCell>
            <TableCell>{issue.closedSprints}</TableCell>
            <TableCell>{issue.status}</TableCell>
            <TableCell>{issue.storyPoints}</TableCell>
            <TableCell>{issue.assignee}</TableCell>
            <TableCell>{issue.timeSpent}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface ISprintSummaryTable {
  sprintId: string | null;
}

export default SprintSummaryTable;
