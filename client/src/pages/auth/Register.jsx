import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleRegister(e) {
    e.preventDefault();

    axios.post(`${BACKEND_URL}/register`, { fullName, email, password })
      .then((res) => {
        toast.success(res.data)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      })
      .catch((err) => {
        toast.error(err.response.data)
      })
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5 p-4 border rounded shadow-sm bg-white">
        <ToastContainer />
        <h2 className="mb-4 text-center">Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Already have an account?{" "}
            <NavLink to="/login" className="text-decoration-none">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
