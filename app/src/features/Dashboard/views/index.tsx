import LinkCard from "../components/LinkCard/LinkCard";

const DashboardView = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <LinkCard to="/sprint-summary">Go to Sprint Summary</LinkCard>
      <LinkCard to="/sprint-metricts">Go to Sprint Metrics</LinkCard>
    </div>
  );
};

export default DashboardView;
