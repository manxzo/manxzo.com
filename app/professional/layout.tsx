
import ProfessionalDock from "@/components/ProfessionalDock/ProfessionalDock";

const ProfessionalLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            {children}
            <div className="fixed bottom-0 w-full">
                <ProfessionalDock />
            </div>
        </div>
    );
};

export default ProfessionalLayout;
