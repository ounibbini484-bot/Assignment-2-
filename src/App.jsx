import React, { useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: users.length + 1,
      fullName: form.fullName,
      email: form.email,
      address: form.address,
      role: form.role,
      phone: form.phone,
      status: form.status
    };

    setUsers([...users, newUser]);
    setIsLoggedIn(true);
    setForm(initialFormState);
  };

  const handleClear = () => {
    setForm(initialFormState);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <main className="app-container">
      <div className="form-header">
        <h1>User Registration</h1>
        <p>Create your new account in seconds</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-input"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
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
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-input"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone"
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
            placeholder="Enter your address"
          />
        </div>

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

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Clear
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {isLoggedIn && (
        <>
          <hr />

          <h2>User List</h2>

          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>
                    <a href="#">{user.email}</a>
                  </td>
                  <td>{user.phone}</td>
                  <td className={user.role.toLowerCase()}>
                    {user.role}
                  </td>
                  <td className="active">{user.status}</td>
                  <td>
                    <button className="edit">Edit</button>

                    <button
                      className="delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="note">
            <span>E</span> = Edit / Update &nbsp;&nbsp;&nbsp;
            <span>D</span> = Delete Record &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
            All actions call their respective API endpoints.
          </p>
        </>
      )}
    </main>
  );
};

export default App;