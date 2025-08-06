import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function EditProductPage() {

    const {id} = useParams()

    const [product, setProduct] = useState({})

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/getproduct/${id}`, {withCredentials: true})
            .then((res)=>{
                setProduct(res.data)
            })
            .catch((err)=>{
                console.error(err)
            })
    },[])

  return (
    <div>
      <h1>Edit Product - {id}</h1>
      <p>{product.itemName}</p>
      <p>{product.itemDesc}</p>
      <p>{product.itemPrice}</p>
      <img src={`${BACKEND_URL}/images/products/${product._id}.jpg`} alt="" width={200} height={200}/>
    </div>
  )
}

export default EditProductPage
