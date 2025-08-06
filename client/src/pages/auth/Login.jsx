import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { isLoggedIn, login, updateUser} = useContext(AuthContext)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [])

  function handleLogin(e) {
    e.preventDefault();
    axios.post(`${BACKEND_URL}/login`, { email, password }, { withCredentials: true })
      .then((res)=>{
        toast.success(res.data.message)
        login(res.data.role)
        updateUser(res.data.user)
        setTimeout(()=>{
          navigate('/')
        }, 1000)
      })
      .catch((err)=>{
        toast.error(err.response.data)
      })
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5 p-4 border rounded shadow-sm bg-white">
        <ToastContainer />
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Don't have an account?{" "}
            <NavLink to="/register" className="text-decoration-none">
              Create an account
            </NavLink>
          </p>
          <Link to="/forgotpw" className="text-decoration-none d-block">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
