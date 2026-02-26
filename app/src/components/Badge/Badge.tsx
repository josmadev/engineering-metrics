export const Badge = (props: BadgeProps) => {
  const { text, bgColor, textColor, borderColor } = props;
  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      {text}
    </span>
  );
};

interface BadgeProps {
  text: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}
