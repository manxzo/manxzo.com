
import CasualDock from "@/components/CasualDock/CasualDock";
const CasualLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            {children}
            <div className="fixed bottom-0 w-full">
                <CasualDock />
            </div>
        </div>
    );
};

export default CasualLayout;
