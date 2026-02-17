import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">{isOpen ? "Admin Panel" : "AP"}</h2>

        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {isOpen ? "⟨" : "⟩"}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/books" className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="nav-text">Books</span>
        </NavLink>

        <NavLink to="/admin/add-book" className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="nav-text">Add Book</span>
        </NavLink>

        <NavLink to="/" className="back-home">
          <span className="nav-text">Back to Site</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
