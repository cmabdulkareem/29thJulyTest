import {useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function AdminRoutes(props) {
  const {isLoggedIn, isAdmin, loading} = useContext(AuthContext);

    if(loading){
        return <h1>Loading...</h1>
    }

  return (
    isLoggedIn && isAdmin ? (props.children)
    :
    <Navigate to="/login" />
  )
}

export default AdminRoutes
