import React from 'react'
import {useState} from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  const initialFormState = {
    fullName : '',
    email: '',
    address: '',
    role: 'User'
  };

  const [form, setForm] = useState(initialFormState)

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', form);
    alert(`Registration is successful for ${form.fullName} !`)
    setForm(initialFormState)
    
  }
  const handleClear = () => {
    setForm(initialFormState);
  }
  
  return (
    <>
    <main className='app-container'>
      <div className="form-header">
        <h1>User Registration</h1>
        <p>Create your new account in seconds</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName"className='form-input' name="fullName" value={form.fullName} onChange={handleChange} required placeholder='Enter your full name'/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email"className='form-input' name="email" value={form.email} onChange={handleChange} required placeholder='Enter your email'/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address"className='form-input' name="address" value={form.address} onChange={handleChange} required placeholder='Enter your address'/>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role"className='form-select' name="role" value={form.role} onChange={handleChange} required>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
        <div className="form-actions">
          <button type='button' className='btn btn-secondary' onClick={handleClear}>Clear</button>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </div>

      </form>
    </main>
    </>
  )
}

export default App