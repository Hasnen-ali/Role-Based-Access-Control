import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateBlog from "./components/UpdateBlog";
function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <div className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/">
      Blog App
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        {localStorage.getItem("token") ? (
          <>
            {/* Home Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Add Blog Link (Admin Only) */}
            {getRoleFromToken() === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/add-blog">
                  Add Blog
                </Link>
              </li>
            )}

            {/* Logout Button */}
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Login Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            {/* Register Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</div>
        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/add-blog"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AddBlog />
                </ProtectedRoute>
              }
            />
              <Route path="/update-blog/:id" element={<ProtectedRoute requiredRole="admin"><UpdateBlog /></ProtectedRoute>} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-light text-center py-3 mt-4">
          <div className="container">
            <p className="mb-0">© 2025 Blog App. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;




import {jwtDecode} from "jwt-decode"; // Correct default import

export const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token); // Decode the token using jwtDecode
    return decoded.role;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};




import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const role = getRoleFromToken();

  if (!role || (requiredRole && role !== requiredRole)) {
    // Redirect to login if not authorized
    return <Navigate to="/login" />;
  }

  return children;
}


