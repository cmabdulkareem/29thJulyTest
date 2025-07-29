import { createRoot } from 'react-dom/client'
import AuthContext from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContext>,
)
