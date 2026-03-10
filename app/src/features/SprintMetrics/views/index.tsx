import { SprintSelect } from "@/components/SprintSelect/SprintSelect";
import { useTeam } from "@/providers/TeamProvider/TeamProvider";
import { useSprintSummaryQuery } from "@/queries/useSprintSummaryQuery";
import {
  formatMinutesToTime,
  parseWorkTimeToMinutes,
} from "@/lib/formatWorkTime";
import { useSearch } from "@tanstack/react-router";
import {
  DEV_ROLES,
  STORY_POINTS_BY_ROLE,
  WORK_FOCUS_BY_ROLE,
  TIME_PER_MENTORY,
} from "../utils/harcodedValuesFse";
import {
  MEETING_HOURS,
  SPRINT_DURATION_DAYS,
  TOTAL_GROOMING_HOURS,
} from "../utils/hardcodedValues";
import { Button } from "@/components/ui/Button/button";

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

  const calculateIndividualCapacity = (assignee: string) => {
    const dev = DEV_ROLES[assignee as keyof typeof DEV_ROLES];
    const role = dev?.role || "Unknown";

    const holidays = assignee === "Jose Manuel González Risco" ? 5 : 0;
    const totalWorkingDays = SPRINT_DURATION_DAYS - holidays;

    // round up to the nearest quarter (0.25) instead of whole numbers
    const ceilToQuarter = (n: number) => Math.ceil(n / 0.25) * 0.25;

    // compute meeting burden per sprint and per day
    const totalMeetingHours = dev?.attendGrooming
      ? MEETING_HOURS + TOTAL_GROOMING_HOURS
      : MEETING_HOURS;
    const dailyMeetingHours = totalMeetingHours / SPRINT_DURATION_DAYS;

    // standard 8‑hour work day
    const baseDailyHours = 8;

    // hours available after meetings
    const dailyAvailableHours = baseDailyHours - dailyMeetingHours;
    const workingHoursAfterHolidays = dailyAvailableHours * totalWorkingDays;

    // apply role-specific focus and subtract mentory time
    const baseWorkFocus = WORK_FOCUS_BY_ROLE[role];
    const mentoryTimeReduction = (dev?.mentory || 0) * TIME_PER_MENTORY;
    const effectiveWorkFocus = Math.max(
      0,
      baseWorkFocus - mentoryTimeReduction,
    );

    const effectiveHours = workingHoursAfterHolidays * effectiveWorkFocus;

    // time capacity in minutes
    const timeCapacityInMinutes = Math.round(effectiveHours * 60);

    // story‑point capacity based on role rate (assumed SP per day).
    // first convert effective hours back into equivalent working days,
    // then multiply by the SP/day rate.
    const storyPointsCapacity = ceilToQuarter(
      (effectiveHours / baseDailyHours) * STORY_POINTS_BY_ROLE[role],
    );

    return {
      storyPointsCapacity,
      timeCapacityInMinutes,
      role,
      holidays,
      totalWorkingDays,
      effectiveHours,
    };
  };

  const calculateTeamCapacity = () => {
    const teamMembers = Object.entries(parseDataByAssignee()).filter(
      ([assignee]) => assignee !== "Unassigned",
    );

    let totalStoryPointsCapacity = 0;
    let totalTimeCapacityMinutes = 0;

    teamMembers.forEach(([assignee]) => {
      const capacity = calculateIndividualCapacity(assignee);
      totalStoryPointsCapacity += capacity.storyPointsCapacity;
      totalTimeCapacityMinutes += capacity.timeCapacityInMinutes;
    });

    return {
      totalStoryPointsCapacity,
      totalTimeCapacityMinutes,
    };
  };

  const calculateTeamResults = () => {
    const teamMembers = Object.entries(parseDataByAssignee()).filter(
      ([assignee]) => assignee !== "Unassigned",
    );

    let totalStoryPoints = 0;
    let totalTimeSpent = 0;

    teamMembers.forEach(([, { storyPoints, timeSpent }]) => {
      totalStoryPoints += storyPoints;
      totalTimeSpent += timeSpent;
    });

    return {
      totalStoryPoints,
      totalTimeSpent,
    };
  };

  const generateCSVData = () => {
    const csvData = [];

    // Team summary header
    csvData.push(["Team Summary"]);
    csvData.push(["Metric", "Value"]);
    csvData.push([
      "Total Story Points Capacity",
      teamCapacity.totalStoryPointsCapacity,
    ]);
    csvData.push([
      "Total Time Capacity",
      formatMinutesToTime(teamCapacity.totalTimeCapacityMinutes),
    ]);
    csvData.push([
      "Total Story Points Completed",
      teamResults.totalStoryPoints,
    ]);
    csvData.push([
      "Total Time Spent",
      formatMinutesToTime(teamResults.totalTimeSpent),
    ]);
    csvData.push(["Story Points Completion %", `${storyPointsPercentage}%`]);
    csvData.push(["Time Tracking %", `${timeTrackingPercentage}%`]);
    csvData.push([]); // Empty row

    // Individual developers header
    csvData.push(["Individual Developers"]);
    csvData.push([
      "Developer",
      "Role",
      "Holidays",
      "Working Days",
      "SP Capacity",
      "Time Capacity",
      "SP Completed",
      "Time Spent",
    ]);

    // Individual developers data
    Object.entries(parseDataByAssignee())
      .filter(([assignee]) => assignee !== "Unassigned")
      .forEach(([assignee, { storyPoints, timeSpent }]) => {
        const capacity = calculateIndividualCapacity(assignee);
        csvData.push([
          assignee,
          capacity.role,
          capacity.holidays,
          capacity.totalWorkingDays,
          capacity.storyPointsCapacity,
          formatMinutesToTime(capacity.timeCapacityInMinutes),
          storyPoints,
          formatMinutesToTime(timeSpent),
        ]);
      });

    return csvData;
  };

  const downloadCSV = () => {
    const csvData = generateCSVData();
    const csvContent = csvData
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `sprint-metrics-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const teamCapacity = calculateTeamCapacity();
  const teamResults = calculateTeamResults();

  const timeTrackingPercentage =
    teamCapacity.totalTimeCapacityMinutes > 0
      ? Math.round(
          (teamResults.totalTimeSpent / teamCapacity.totalTimeCapacityMinutes) *
            100,
        )
      : 0;

  const storyPointsPercentage =
    teamCapacity.totalStoryPointsCapacity > 0
      ? Math.round(
          (teamResults.totalStoryPoints /
            teamCapacity.totalStoryPointsCapacity) *
            100,
        )
      : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sprint Metrics</h1>
        <Button onClick={downloadCSV} className="bg-blue-600 hover:bg-blue-700">
          Download CSV
        </Button>
      </div>
      <SprintSelect key={team} />

      {/* Team Capacity Summary */}
      <div className="border p-4 rounded shadow bg-blue-50">
        <h2 className="text-xl font-semibold mb-2">Team Capacity</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Total Story Points Capacity</p>
            <p className="text-2xl font-bold text-blue-600">
              {teamCapacity.totalStoryPointsCapacity}
            </p>
          </div>
          <div>
            <p className="font-medium">Total Time Capacity</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatMinutesToTime(teamCapacity.totalTimeCapacityMinutes)}
            </p>
          </div>
        </div>
      </div>

      {/* Team Results Summary */}
      <div className="border p-4 rounded shadow bg-green-50">
        <h2 className="text-xl font-semibold mb-2">Team Results</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-medium">Total Story Points Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {teamResults.totalStoryPoints}
            </p>
          </div>
          <div>
            <p className="font-medium">Total Time Spent</p>
            <p className="text-2xl font-bold text-green-600">
              {formatMinutesToTime(teamResults.totalTimeSpent)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Story Points Completion</p>
            <p
              className={`text-2xl font-bold ${
                storyPointsPercentage >= 100
                  ? "text-red-600"
                  : storyPointsPercentage >= 80
                    ? "text-yellow-600"
                    : "text-green-600"
              }`}
            >
              {storyPointsPercentage}%
            </p>
          </div>
          <div>
            <p className="font-medium">Time Tracking</p>
            <p
              className={`text-2xl font-bold ${
                timeTrackingPercentage >= 100
                  ? "text-red-600"
                  : timeTrackingPercentage >= 80
                    ? "text-yellow-600"
                    : "text-green-600"
              }`}
            >
              {timeTrackingPercentage}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Object.entries(parseDataByAssignee())
          .filter(([assignee]) => assignee !== "Unassigned")
          .map(([assignee, { storyPoints, timeSpent }]) => {
            const capacity = calculateIndividualCapacity(assignee);

            return (
              <div
                key={assignee}
                className="flex flex-col gap-2 border p-4 rounded shadow"
              >
                <h2 className="text-lg font-semibold">{assignee}</h2>
                <p>Role: {capacity.role}</p>
                <p>Holidays: {capacity.holidays}</p>
                <p>Working Days: {capacity.totalWorkingDays}</p>
                <h3 className="font-semibold">Capacity</h3>
                <p>Story Points: {capacity.storyPointsCapacity}</p>
                <p>
                  Time Spent:{" "}
                  {formatMinutesToTime(capacity.timeCapacityInMinutes)}
                </p>
                <h3 className="font-semibold">Results</h3>
                <p>Story Points: {storyPoints}</p>
                <p>Time Spent: {formatMinutesToTime(timeSpent)}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SprintMetrics;
