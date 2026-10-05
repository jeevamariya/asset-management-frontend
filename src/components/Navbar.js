import { useNavigate } from "react-router-dom";

import api from "../api/api";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken =
      localStorage.getItem("refresh_token");

    try {
      await api.post("/token/logout/", {
        refresh: refreshToken,
      });
    } catch (error) {
      // Continue logout even if the token is already invalid.
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Asset Management System</h2>

      <div>
        <span>
          {localStorage.getItem("is_staff") === "true" ? "Admin" : "Employee"}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;