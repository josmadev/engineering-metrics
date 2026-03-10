import { ROLES } from "@/lib/constants";

export const DEV_ROLES = {
  "Alisa Naumycheva": {
    role: ROLES.MID,
    attendGrooming: false,
    mentory: 0,
  },
  "Andrés Valle": {
    role: ROLES.SENIOR,
    attendGrooming: false,
    mentory: 2,
  },
  "Santiago Italo Bocco": {
    role: ROLES.MID,
    attendGrooming: false,
    mentory: 0,
  },
  "Jose Manuel González Risco": {
    role: ROLES.LEAD,
    attendGrooming: true,
    mentory: 2,
  },
};

export const WORK_FOCUS_BY_ROLE: Record<string, number> = {
  [ROLES.JUNIOR]: 1,
  [ROLES.MID]: 0.95,
  [ROLES.SENIOR]: 0.9,
  [ROLES.LEAD]: 0.5,
};

export const STORY_POINTS_BY_ROLE: Record<string, number> = {
  [ROLES.JUNIOR]: 0.5,
  [ROLES.MID]: 0.8,
  [ROLES.SENIOR]: 1,
  [ROLES.LEAD]: 1,
};

export const TIME_PER_MENTORY = 0.05;
