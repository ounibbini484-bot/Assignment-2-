

const UserForm = ({ form, handleChange, handleSubmit, handleClear, editingUserId }) => {
  return (
    <section className="dashboard-panel form-panel">
      <div className="panel-header">
        <h2>{editingUserId ? "Edit User" : "Add New User"}</h2>
        <p>{editingUserId ? "Update user details" : "Enter details to register a new user"}</p>
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
            {editingUserId ? "Update User" : "Register User"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserForm;
