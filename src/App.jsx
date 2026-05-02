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
  return (
    <>
    <main className='app-container'>
      <div className="form-header">
        <h1>User Registration</h1>
        <p>Create your new account in seconds</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor=""></label>
        </div>

      </form>
    </main>
    </>
  )
}

export default App