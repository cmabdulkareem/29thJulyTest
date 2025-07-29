import Header from '../partials/Header'
import Footer from '../partials/Footer'
import {Outlet} from 'react-router-dom'

function UserLayout() {
  return (
    <div>
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-fill">
        <Outlet />
      </main>
      
      <Footer />
    </div>
    </div>
  )
}

export default UserLayout
