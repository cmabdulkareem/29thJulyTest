import {useContext } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'

const BACKEND_URL = "http://localhost:3000"

function AdminHeader() {

  const navigate = useNavigate()
  const { logout, user, isLoggedIn } = useContext(AuthContext)

  function handleLogout() {
    axios.get(`${BACKEND_URL}/logout`, { withCredentials: true })
      .then((res) => {
        toast.info(res.data)
        setTimeout(() => {
          logout()
          navigate('/login')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <ToastContainer />
      <header className="p-3 text-bg-dark">
        {" "}
        <div className="container">
          {" "}
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {" "}
            <NavLink
              to="/admin"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              {" "}
              <img src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png" alt="" className='me-4 pt-2' height={40} />
            </NavLink>{" "}
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {" "}
              <li>
                <NavLink to="/admin" end className={({ isActive }) =>
                  isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"
                }>
                  Dashboard
                </NavLink>
              </li>{" "}
              <li>
                <NavLink to="/admin/products" className={({ isActive }) =>
                  isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"
                }>
                  Products
                </NavLink>
              </li>{" "}
              <li>
                <NavLink to="/admin/orders" className={({ isActive }) =>
                  isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"
                }>
                  Orders
                </NavLink>
              </li>{" "}
            </ul>{" "}
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              {" "}
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />{" "}
            </form>{" "}
            <div className="text-end">
              {
                isLoggedIn ?
                  (<>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                      <li>
                        <button onClick={handleLogout} className="btn btn-outline-warning me-2">
                          Logout
                        </button>
                      </li>
                      <li>
                        <NavLink to="/" className={({ isActive }) =>
                          isActive ? "nav-link px-2 text-white" : "nav-link px-2 text-white"
                        }>
                          Hi, <span className='text-warning'>{user.fullName}</span>
                        </NavLink>
                      </li>
                    </ul>
                  </>) : (
                    <>
                      <NavLink to="/register" className="btn btn-outline-warning me-2">
                        Register
                      </NavLink>
                      <NavLink to="/login" className="btn btn-outline-warning me-2">
                        Log In
                      </NavLink>
                    </>)
              }
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </header>
    </div>
  )
}

export default AdminHeader
