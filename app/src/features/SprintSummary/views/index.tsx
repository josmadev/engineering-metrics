import { useEffect, useState } from "react";
import { useTeam } from "@/providers/TeamProvider/TeamProvider";
import { SprintSelect } from "@/components/SprintSelect/SprintSelect";
import { SprintSummaryTable } from "../components/SprintSummaryTable/SprintSummaryTable";

const SprintSummaryView = () => {
  const [sprintId, setSprintId] = useState<number | null>(null);

  const { team } = useTeam();

  useEffect(() => {
    setSprintId(null);
  }, [team]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sprint Summary</h1>
      <SprintSelect key={team} sprintId={sprintId} setSprintId={setSprintId} />
      <SprintSummaryTable sprintId={sprintId} />
    </div>
  );
};

export default SprintSummaryView;
