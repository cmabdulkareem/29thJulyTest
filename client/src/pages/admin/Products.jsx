import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const BACKEND_URL = "http://localhost:3000"

function Products() {

  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        toast.error("Unable to fetch products")
      })
  }, [])


  function handleEdit(id) {
    console.log(id)
    navigate(`/admin/editproduct/${id}`)
  }

  function handleDelete(id) {
    let confirm = window.confirm("Are you sure you want to delete this product?")
    if (confirm){
      axios.delete(`${BACKEND_URL}/deleteproduct/${id}`, { withCredentials: true })
        .then((res) => {
            toast.success("Product deleted successfully")
            setProducts(prev => prev.filter(p => p._id !== id))
        })
        .catch((err) => {
          toast.error("Unable to delete product")
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
              {products.map((product, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td><img src={`${BACKEND_URL}/images/products/${product._id}.jpg`} alt={product.itemName} width="50" height="50" /></td>
                  <td>{product.itemName}</td>
                  <td>{product.itemDesc}</td>
                  <td>{product.itemPrice}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(product._id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
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
