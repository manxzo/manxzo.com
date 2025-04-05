import AdminDock from "@/components/AdminDock/AdminDock";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <AdminDock/>
    </div>
  );
};

export default AdminLayout;
