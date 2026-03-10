import { useTeam } from "@/providers/TeamProvider/TeamProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu/DropdownMenu";
import { Button } from "../ui/Button/button";
import { useNavigate } from "@tanstack/react-router";

export const ToggleTeam = () => {
  const { team, handleSetTeam } = useTeam();
  const navigate = useNavigate();

  const handleTeamChange = (newTeam: "FSE" | "BSE") => {
    handleSetTeam(newTeam);
    navigate({ to: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {team}
          <span className="sr-only">Toggle team</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleTeamChange("FSE")}>
          Frontend Team
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleTeamChange("BSE")}>
          Backend Team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
