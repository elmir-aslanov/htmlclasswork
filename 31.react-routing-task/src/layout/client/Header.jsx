import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="client-header">
      <div className="container">
        <div className="logo">
          <NavLink to="/">Elmir-Land</NavLink>
        </div>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
          <NavLink to="/books" className={({ isActive }) => (isActive ? 'active' : '')}>My Books</NavLink>
          <NavLink to="/reviews" className={({ isActive }) => (isActive ? 'active' : '')}>Reviews</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
        </nav>
        <div className="actions">
          <NavLink to="/favorites" className="favorites-link">
            <FaHeart className="heart-icon" />
          </NavLink>
          <NavLink to="/admin/dashboard" className="admin-link">Admin</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
