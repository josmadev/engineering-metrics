import { useTeam } from "@/providers/TeamProvider/TeamProvider";
import { SprintSelect } from "@/components/SprintSelect/SprintSelect";
import { SprintSummaryTable } from "../components/SprintSummaryTable/SprintSummaryTable";

const SprintSummaryView = () => {
  const { team } = useTeam();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sprint Summary</h1>
      <SprintSelect key={team} />
      <SprintSummaryTable />
    </div>
  );
};

export default SprintSummaryView;
