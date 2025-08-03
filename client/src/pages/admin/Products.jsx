import React, { useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'

const BACKEND_URL = "http://localhost:3000"

function Products() {

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


function handleEdit(x){
  alert(`you are deleting item no ${x+1}`)
}



  function handleDelete(id){
    let confirm = window.confirm("Are you sure to delete this item ?")

    if(confirm){
      axios.delete(`${BACKEND_URL}/deleteproduct/${id}`, {withCredentials: true})
        .then((res)=>{
          toast.success(res.data)
          setProducts(products.filter((product)=>product._id !== id))
          // we are filtering the products array to remove the deleted product
          // so that the table is updated
        })
        .catch((err)=>{
          console.error(err)
        })
    }
  }


  return (
    <div className="container">
      <div className="row">
        <ToastContainer />
        <div>
          <h1>Products</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index)=>(
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td><img src={`${BACKEND_URL}/images/products/${product._id}.jpg`} alt={product.itemName} width="50" height="50"/></td>
                  <td>{product.itemName}</td>
                  <td>{product.itemDesc}</td>
                  <td>{product.itemPrice}</td>
                  <td>
                    <button  className="btn btn-primary me-2" onClick={()=>handleEdit(product._id)}>Edit</button>
                    <button  className="btn btn-danger" onClick={()=>handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/admin/addproduct" className="btn btn-primary">New Product</Link>
        </div>
      </div>
    </div>
  )
}

export default Products
