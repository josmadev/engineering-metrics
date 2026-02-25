import { Link } from "@tanstack/react-router";

const LinkCard: React.FC<ILinkCard> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="border p-3 rounded-md h-40 w-40 flex items-center justify-center text-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
    >
      {children}
    </Link>
  );
};

interface ILinkCard {
  to: string;
  children: React.ReactNode;
}

export default LinkCard;
