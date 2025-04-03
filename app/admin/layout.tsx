import MyDock from "@/components/MyDock/MyDock";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <MyDock />
    </div>
  );
};

export default AdminLayout;
