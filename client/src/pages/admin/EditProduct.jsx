import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function EditProduct() {

    const { id } = useParams()

    const [itemName, setItemName] = useState('')
    const [itemDesc, setItemDesc] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemImage, setItemImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('https://www.svgrepo.com/show/508699/landscape-placeholder.svg')
    const [formData, setFormData] = useState({})

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/getproduct/${id}`, {withCredentials: true})
            .then((res)=>{
                setItemName(res.data.itemName)
                setItemDesc(res.data.itemDesc)
                setItemPrice(res.data.itemPrice)
                setImagePreview(`${BACKEND_URL}/images/products/${id}.jpg`)
            })
            .catch((err)=>{
                console.error(err)
            })
    },[])


  const handleFormSubmit = (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', itemName)
    form.append('description', itemDesc)
    form.append('price', itemPrice)
    form.append('image', itemImage)
    form.append('id', id)
    setFormData(form)

    axios.put(`${BACKEND_URL}/updateproduct`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }, withCredentials: true
    })
    .then((res)=>{
      toast.success(res.data)
      setItemName('')
      setItemDesc('')
      setItemPrice('')
      setItemImage(null)
      setImagePreview('https://www.svgrepo.com/show/508699/landscape-placeholder.svg')
    })
    .catch((err)=>{
      console.error(err)
    })
  }

    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div>
                    <h1>Edit Product</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="col-6">
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Product Name'
                                onChange={(e) => setItemName(e.target.value)}
                                value={itemName}
                            /><br />
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Product Description'
                                onChange={(e) => setItemDesc(e.target.value)}
                                value={itemDesc}
                            /><br />
                            <input
                                type="number"
                                className='form-control'
                                placeholder='Product Price'
                                onChange={(e) => setItemPrice(e.target.value)}
                                value={itemPrice}
                            /><br />
                            <input
                                type="file"
                                className='form-control'
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) {
                                        setItemImage(file)
                                        setImagePreview(URL.createObjectURL(file))
                                    }
                                }}
                            />
                        </div>
                        <img className='mt-4' src={imagePreview} alt="" width={200} height={200} />
                        <div className='mt-4'>
                            <button type="reset" className='btn btn-danger me-2'>Reset</button>
                            <button type="submit" className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct
