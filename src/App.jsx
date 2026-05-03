import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const initialFormState = {
    fullName: "",
    email: "",
    address: "",
    role: "User",
    phone: "",
    status: "Active"
  };

  const [form, setForm] = useState(initialFormState);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/users");
      const formattedUsers = response.data.users.map(u => ({
        id: u._id,
        fullName: u.name,
        email: u.email,
        phone: u.phone,
        address: u.address,
        role: u.role,
        status: u.status
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchQuery.toLowerCase())
   
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/users", {
        name: form.fullName,
        email: form.email,
        address: form.address,
        role: form.role,
        phone: form.phone,
        status: form.status.toLowerCase()
      });

      const u = response.data.user;
      const newUser = {
        id: u._id,
        fullName: u.name,
        email: u.email,
        address: u.address,
        role: u.role,
        phone: u.phone,
        status: u.status
      };

      setUsers([...users, newUser]);
      setForm(initialFormState);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleClear = () => {
    setForm(initialFormState);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/users/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>User Management Portal</h1>
        <p>Efficiently manage your users, roles, and permissions.</p>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-panel form-panel">
          <div className="panel-header">
            <h2>Add New User</h2>
            <p>Enter details to register a new user</p>
          </div>

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. john@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. +1 234 567 8900"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-input"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter full address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear Form
              </button>
              <button type="submit" className="btn btn-primary">
                Register User
              </button>
            </div>
          </form>
        </section>

        <section className="dashboard-panel list-panel">
          <div className="panel-header list-header-flex">
            <div>
              <h2>User Directory</h2>
              <p>View and manage registered users</p>
            </div>
            
            <div className="search-bar-container">
              <div className="search-input-wrapper">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery && (
                <button className="btn-icon" onClick={() => setSearchQuery("")} title="Clear Search">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
            </div>
          </div>

          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name & Address</th>
                  <th>Contact Info</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="user-name">{user.fullName}</div>
                        <div className="user-address">{user.address}</div>
                      </td>
                      <td>
                        <div className="user-email">
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </div>
                        <div className="user-phone">{user.phone}</div>
                      </td>
                      <td>
                        <span className={`role-badge role-${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge status-${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action edit" title="Edit User">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() => handleDelete(user.id)}
                            title="Delete User"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-record">
                      <div className="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <p>No users found matching your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;