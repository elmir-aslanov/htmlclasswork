import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Sidebar.css";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className={`admin-layout ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar isOpen={isOpen} onToggle={toggleSidebar} />

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
