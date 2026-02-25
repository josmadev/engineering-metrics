import { useTeam } from "@/providers/TeamProvider/TeamProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu/DropdownMenu";
import { Button } from "../ui/Button/button";

export const ToggleTeam = () => {
  const { team, handleSetTeam } = useTeam();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {team}
          <span className="sr-only">Toggle team</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSetTeam("FSE")}>
          Frontend Team
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTeam("BSE")}>
          Backend Team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
