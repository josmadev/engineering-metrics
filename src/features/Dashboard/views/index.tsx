import LinkCard from "../components/LinkCard/LinkCard";

const DashboardView = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <LinkCard to="/sprint-summary">Go to Sprint Summary</LinkCard>
    </div>
  );
};

export default DashboardView;
