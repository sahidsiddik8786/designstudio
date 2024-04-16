import React, { useState, useEffect } from "react";
import axios from "axios";

import '../../pages/Admin/Users.css'

const API_URL = "http://localhost:8080";

const Userstaff = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserActivation = async (userId) => {
    try {
      await axios.put(`${API_URL}/users/${userId}/activate`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="col-md-12 my-2"> {/* Adjusted column size */}
      <h2>Users Lists</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-styled" style={{ fontSize: "18px", padding: "10px", margin: "10px" }}> {/* Adjusted font size, padding, and margin */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>MobileNO</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <button
                    onClick={() => toggleUserActivation(user._id)}
                    className={user.active ? "active-button" : "deactive-button"}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userstaff;
