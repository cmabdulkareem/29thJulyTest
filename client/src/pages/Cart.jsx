import React, { useEffect} from 'react'
import axios from 'axios'

const BACKEND_URL = "http://localhost:3000"

function Cart() {

useEffect(()=>{
    axios.get(`${BACKEND_URL}/cart`, { withCredentials: true })
      .then((res)=>{
        console.log(res.data.products)
      })
      .catch((err)=>{})
  }, [])

  return (
    <div>
      <h1>Cart - private</h1>
    </div>
  )
}

export default Cart
