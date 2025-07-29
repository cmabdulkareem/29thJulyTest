import AdminHeader from '../partials/AdminHeader';
import Footer from '../partials/Footer';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminHeader />
      
      <main className="flex-fill">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default AdminLayout;
