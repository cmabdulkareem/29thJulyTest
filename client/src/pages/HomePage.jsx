import React, { useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import Banner from '../components/Banner'
import Card from '../components/Card'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/getallproducts`, {withCredentials: true})
      .then((res)=>{
        setProducts(res.data)
      })
      .catch((err)=>{
        console.error(err)
      })
  },[])

  return (
    <div>
      <Banner />
      <div className="container-lg mt-5">
        <div className="row">
        {products.map((product, index)=>(<div key={index} className="col-md-3 mb-4"><Card passedProduct={product} /></div>))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
