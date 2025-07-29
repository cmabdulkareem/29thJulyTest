import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function UserRoutes(props) {

    const {isLoggedIn, loading} = useContext(AuthContext);

    if(loading){
        return <h1>Loading...</h1>
    }


return (
      isLoggedIn ? (props.children)
      :
      (<Navigate to="/login" />)
  )
}

export default UserRoutes
