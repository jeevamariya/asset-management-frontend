import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      const response = await api.post("/token/", {
        username,
        password,
      });

      localStorage.setItem(
      "access_token",
      response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      const meResponse = await api.get("/me/");

      localStorage.setItem(
        "is_staff",
        String(meResponse.data.is_staff)
      );

      localStorage.setItem(
        "username",
        meResponse.data.username
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Invalid username or password"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>

        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;