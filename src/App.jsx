import { useState, useEffect } from "react";
import "./App.css";
import * as api from "./services/api.jsx";
import UserForm from "./components/UserForm.jsx";
import UserTable from "./components/UserTable.jsx";
import SearchBar from "./components/SearchBar.jsx";

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
  const [editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchId, setSearchId] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await api.getUsers();
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

  const handleSearchById = async () => {
    if (!searchId.trim()) return;
    try {
      const response = await api.getUserById(searchId);
      const u = response.data.user;
      if (u) {
        const formattedUser = {
          id: u._id,
          fullName: u.name,
          email: u.email,
          phone: u.phone,
          address: u.address,
          role: u.role,
          status: u.status
        };
        setUsers([formattedUser]);
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      alert("User not found or error occurred");
      setUsers([]);
    }
  };

  useEffect(() => {
    const searchBackend = async () => {
      if (searchQuery.trim() === "") {
        fetchUsers();
        return;
      }
      try {
        const response = await api.searchUsers(searchQuery);
        const formattedUsers = (response.data.users || []).map(u => ({
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
        console.error("Error searching users:", error);
        setUsers([]);
      }
    };

    const timeoutId = setTimeout(() => {
      searchBackend();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
      if (editingUserId) {
        const response = await api.updateUser(editingUserId, {
          name: form.fullName,
          email: form.email,
          address: form.address,
          role: form.role,
          phone: form.phone,
          status: form.status.toLowerCase()
        });

        const u = response.data.user;
        const updatedUser = {
          id: u._id,
          fullName: u.name,
          email: u.email,
          address: u.address,
          role: u.role,
          phone: u.phone,
          status: u.status
        };

        setUsers(users.map(user => user.id === editingUserId ? updatedUser : user));
        setEditingUserId(null);
      } else {
        const response = await api.createUser({
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
      }
      setForm(initialFormState);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleClear = () => {
    setForm(initialFormState);
    setEditingUserId(null);
  };

  const handleEditClick = (user) => {
    setForm({
      fullName: user.fullName,
      email: user.email,
      address: user.address,
      role: user.role,
      phone: user.phone,
      status: user.status.charAt(0).toUpperCase() + user.status.slice(1)
    });
    setEditingUserId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteUser(id);
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
        <UserForm 
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
          editingUserId={editingUserId}
        />

        <section className="dashboard-panel list-panel">
          <div className="panel-header list-header-flex">
            <div>
              <h2>User Directory</h2>
              <p>View and manage registered users</p>
            </div>
            
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchId={searchId}
              setSearchId={setSearchId}
              handleSearchById={handleSearchById}
              fetchUsers={fetchUsers}
            />
          </div>

          <UserTable 
            users={users}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
};

export default App;