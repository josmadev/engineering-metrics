export const SPRINT_DURATION_DAYS = 10; // Assuming a 2-week sprint with 5 working days each week
export const DAILY_TIME_HOURS = 0.8; // hours per day
export const TOTAL_DAILY_HOURS = SPRINT_DURATION_DAYS * DAILY_TIME_HOURS; // Total hours available per developer in a sprint
export const RETRO_MEETING_HOURS = 1.5; // hours spent in retro meetings per sprint
export const REVIEW_MEETING_HOURS = 1; // hours spent in review meetings per sprint
export const PLANNING_MEETING_HOURS = 1.5; // hours spent in planning meetings per sprint
export const MEETING_HOURS =
  TOTAL_DAILY_HOURS +
  RETRO_MEETING_HOURS +
  REVIEW_MEETING_HOURS +
  PLANNING_MEETING_HOURS;
export const TOTAL_AVAILABLE_HOURS = SPRINT_DURATION_DAYS * 8 - MEETING_HOURS; // Total hours available for development work per developer in a sprint
export const TOTAL_GROOMING_HOURS = 3; // hours spent in grooming meetings per sprint
