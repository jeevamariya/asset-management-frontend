import { useEffect, useState } from "react";

import api from "../api/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/me/");

        setUser(response.data);
      } catch (error) {
        setError("Unable to load profile.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
  <div>
    <h1>Profile</h1>

    <div className="profile-card">
      <p>
        <strong>Username:</strong>
        <span>{user.username}</span>
      </p>

      <p>
        <strong>Role:</strong>
        <span>
          {user.is_staff ? "Admin" : "Employee"}
        </span>
      </p>
    </div>
  </div>
);
}

export default Profile;