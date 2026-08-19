import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">E</span>
          <span className="brand-name">
            Eirene <em>Stays</em>
          </span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Hotels
          </NavLink>
          {user?.role === "guest" && (
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              My stays
            </NavLink>
          )}
          {user?.role === "hotel_admin" && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="nav-auth">
          {user ? (
            <>
              <span className="nav-user">{user.name}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Log in
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          background: var(--paper);
          border-bottom: 1px solid var(--line);
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 14px 24px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--ink);
        }
        .brand-mark {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          color: var(--brass-light);
          border-radius: 50%;
          font-size: 15px;
        }
        .brand-name {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .brand-name em { color: var(--brass); font-style: normal; }
        .nav-links {
          display: flex;
          gap: 22px;
          flex: 1;
          justify-content: center;
        }
        .nav-links a {
          color: var(--sage);
          font-size: 0.88rem;
          font-weight: 600;
          padding: 6px 2px;
          border-bottom: 2px solid transparent;
        }
        .nav-links a.active,
        .nav-links a:hover {
          color: var(--ink);
          border-bottom-color: var(--brass);
        }
        .nav-auth {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-user {
          font-size: 0.85rem;
          color: var(--sage);
          margin-right: 4px;
        }
        @media (max-width: 720px) {
          .navbar-inner { flex-wrap: wrap; gap: 10px; }
          .nav-links { order: 3; width: 100%; justify-content: flex-start; gap: 16px; }
        }
      `}</style>
    </header>
  );
}
