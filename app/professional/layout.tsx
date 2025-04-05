import ProfessionalDock from "@/components/ProfessionalDock/ProfessionalDock";
const ProfessionalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative pb-20">
      {children}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <ProfessionalDock />
      </div>
    </div>
  );
};

export default ProfessionalLayout;
