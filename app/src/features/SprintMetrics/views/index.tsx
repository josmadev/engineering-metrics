import { SprintSelect } from "@/components/SprintSelect/SprintSelect";
import { useTeam } from "@/providers/TeamProvider/TeamProvider";
import { useSprintSummaryQuery } from "@/queries/useSprintSummaryQuery";
import {
  formatMinutesToTime,
  parseWorkTimeToMinutes,
} from "@/lib/formatWorkTime";
import { useSearch } from "@tanstack/react-router";
import { DEV_ROLES } from "../utils/harcodedValuesFse";
import {
  SPRINT_DURATION_DAYS,
  TOTAL_AVAILABLE_HOURS,
} from "../utils/hardcodedValues";

const SprintMetrics = () => {
  const { team } = useTeam();

  const { sprintId } = useSearch({ from: "/sprint-metrics" });
  const { data } = useSprintSummaryQuery(sprintId);

  const parseDataByAssignee = () => {
    const dataByAssignee: Record<
      string,
      { storyPoints: number; timeSpent: number }
    > = {};

    data?.forEach((issue) => {
      const assignee = issue.assignedTo || "Unassigned";
      const storyPoints = issue.storyPoints || 0;
      const timeSpent = parseWorkTimeToMinutes(issue.timeSpend || "PT0M");

      if (dataByAssignee[assignee]) {
        dataByAssignee[assignee].storyPoints += storyPoints;
        dataByAssignee[assignee].timeSpent += timeSpent;
      } else {
        dataByAssignee[assignee] = {
          storyPoints,
          timeSpent,
        };
      }
    });

    return dataByAssignee;
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sprint Metrics</h1>
      <SprintSelect key={team} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Object.entries(parseDataByAssignee())
          .filter(([assignee]) => assignee !== "Unassigned")
          .map(([assignee, { storyPoints, timeSpent }]) => (
            <div
              key={assignee}
              className="flex flex-col gap-2 border p-4 rounded shadow"
            >
              <h2 className="text-lg font-semibold">{assignee}</h2>
              <p>
                Role:{" "}
                {DEV_ROLES[assignee as keyof typeof DEV_ROLES]?.role ||
                  "Unknown"}
              </p>
              <p>Holidays: 0</p>
              <p>Working Days: {SPRINT_DURATION_DAYS}</p>
              <h3 className="font-semibold">Capacity</h3>
              <p>Story Points: PENDING TO CALCULATE</p>
              <p>Time Spent: PENDING TO CALCULATE</p>
              <h3 className="font-semibold">Results</h3>
              <p>Story Points: {storyPoints}</p>
              <p>Time Spent: {formatMinutesToTime(timeSpent)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SprintMetrics;
