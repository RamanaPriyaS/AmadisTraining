import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HotelList from "./pages/HotelList.jsx";
import HotelDetail from "./pages/HotelDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminOccupancy from "./pages/AdminOccupancy.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="guest">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="hotel_admin">
                <AdminOccupancy />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container">Eirene Stays.</div>
      </footer>
      <style>{`
        .site-footer {
          border-top: 1px solid var(--line);
          padding: 20px 0;
          margin-top: 40px;
          color: var(--sage);
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}

function NotFound() {
  return (
    <div className="container" style={{ padding: "64px 24px", textAlign: "center" }}>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}
