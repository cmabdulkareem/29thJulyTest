import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card'
import axios from 'axios'

const BACKEND_URL = "http://localhost:3000"

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/products`, {withCredentials: true})
      .then((res)=>{
        setProducts(res.data)
      })
      .catch((err)=>{
        toast.error("Unable to fetch products")
      })
  }, [])

  return (
    <div>
      <Banner />
      <div className="container-lg mt-5">
        <div className="row">
          {products.map((product, index)=> (
            <div className="col-md-3 mb-4" key={index}><Card product={product} /></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
