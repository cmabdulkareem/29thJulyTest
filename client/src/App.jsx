import { Routes, Route } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import UserRoutes from './privateRoutes/UserRoutes'
import AdminRoutes from './privateRoutes/AdminRoutes'
// following are user related pages :
import Home from './pages/HomePage'
import Cart from './pages/Cart'
import MyOrder from './pages/MyOrder'
import ProductPage from './pages/ProductPage'

import AdminLayout from './layouts/AdminLayout'
// following are admin related pages :
import Dashboard from './pages/admin/Dashboard'
import AddProducts from './pages/admin/AddProducts'
import Orders from './pages/admin/Orders'
import Products from './pages/admin/Products'

// following are authentication related pages:
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPw from './pages/auth/ForgotPw'
import EditProduct from './pages/admin/EditProduct'
import EditProductPage from './pages/admin/EditProductPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='cart' element={<UserRoutes><Cart /></UserRoutes>} />
        <Route path='myorder' element={<UserRoutes><MyOrder /></UserRoutes>} />
        <Route path='product/:id' element={<UserRoutes><ProductPage /></UserRoutes>} />
      </Route>

      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminRoutes><Dashboard /></AdminRoutes>} />
        <Route path='addproduct' element={<AdminRoutes><AddProducts /></AdminRoutes>} />
        <Route path='orders' element={<AdminRoutes><Orders /></AdminRoutes>} />
        <Route path='products' element={<AdminRoutes><Products /></AdminRoutes>} />
        <Route path='editproduct/:id' element={<AdminRoutes><EditProduct /></AdminRoutes>} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgotpw' element={<ForgotPw />} />

    </Routes>
  )
}

export default App
