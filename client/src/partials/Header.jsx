import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'

const BACKEND_URL = "http://localhost:3000"

function Header() {
  const navigate = useNavigate()
  const { logout, user, isLoggedIn, cartCount } = useContext(AuthContext)

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
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {/* Logo */}
            <NavLink
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png"
                alt=""
                className="me-4 pt-2"
                height={40}
              />
            </NavLink>

            {/* Nav Menu */}
            <ul className="nav me-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink to="/" className={({ isActive }) =>
                  isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"
                }>
                  Shop
                </NavLink>
              </li>

                <li className="nav-item d-flex align-items-center ms-3">
                      <NavLink to="/cart" className={({ isActive }) =>
                  isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"
                }>
                        🛒 Cart
                        <span className="badge bg-primary ms-2">{cartCount}</span>
                      </NavLink>
                    </li>

              <li>
                <NavLink to="/myorder" className={({ isActive }) =>
                  isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"
                }>
                  My Orders
                </NavLink>
              </li>
            </ul>

            {/* Search Bar */}
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            {/* Right Side Controls */}
            <div className="text-end">
              {
                isLoggedIn ? (
                  <ul className="nav align-items-center">
                    <li className="nav-item">
                      <button onClick={handleLogout} className="btn btn-outline-warning me-2">
                        Logout
                      </button>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link px-2 text-white">
                        Hi, <span className="text-warning">{user.fullName}</span>
                      </span>
                    </li>
                  </ul>
                ) : (
                  <>
                    <NavLink to="/register" className="btn btn-outline-warning me-2">
                      Register
                    </NavLink>
                    <NavLink to="/login" className="btn btn-outline-warning me-2">
                      Log In
                    </NavLink>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
