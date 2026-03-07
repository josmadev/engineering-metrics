import { statusColors } from "./constants";

export const getStatusStyles = (status: string) => {
  return (
    statusColors[status as keyof typeof statusColors] || statusColors["Default"]
  );
};
