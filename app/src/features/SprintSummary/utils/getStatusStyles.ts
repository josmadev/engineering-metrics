export const getStatusStyles = (status: string) => {
  switch (status) {
    case "To Do":
      return {
        bg: "#f1f5f9", // Slate 100
        text: "#475569", // Slate 600
        border: "#cbd5e1", // Slate 300
      };
    case "In Progress":
      return {
        bg: "#eff6ff", // Blue 50;
        text: "#1d4ed8", // Blue 700
        border: "#bfdbfe", // Blue 200
      };
    case "Done":
      return {
        bg: "#ecfdf5", // Emerald 50
        text: "#047857", // Emerald 700
        border: "#a7f3d0", // Emerald 200
      };
    default:
      return {
        bg: "#f8fafc",
        text: "#94a3b8",
        border: "#e2e8f0",
      };
  }
};
