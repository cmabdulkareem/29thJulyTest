import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Banner from '../components/Banner'
import Card from '../components/Card'

function HomePage() {
  const { user } = useContext(AuthContext);

  console.log(user)
  return (
    <div>
      <Banner />
      <div className="container-lg mt-5">
        <div className="row">
          <div className="col-md-3 mb-4"><Card /></div>
          <div className="col-md-3 mb-4"><Card /></div>
          <div className="col-md-3 mb-4"><Card /></div>
          <div className="col-md-3 mb-4"><Card /></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
