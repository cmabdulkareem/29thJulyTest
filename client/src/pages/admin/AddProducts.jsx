import React, { useState } from 'react'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function AddProducts() {

  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [itemImage, setItemImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('https://www.svgrepo.com/show/508699/landscape-placeholder.svg')
  const [formData, setFormData] = useState({})

  const [isColorEnabled, setIsColorEnabled] = useState(false)

  function enableChangeColor() {
    setIsColorEnabled(!isColorEnabled)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', itemName)
    form.append('description', itemDesc)
    form.append('price', itemPrice)
    form.append('image', itemImage)
    setFormData(form)

    axios.post(`${BACKEND_URL}/addproduct`, form, {
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
          <h1>Add Products</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="col-6">
              <input
                type="text"
                className='form-control'
                placeholder='Product Name'
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
              /><br/>
              <input
                type="text"
                className='form-control'
                placeholder='Product Description'
                onChange={(e) => setItemDesc(e.target.value)}
                value={itemDesc}
              /><br/>
              <input
                type="number"
                className='form-control'
                placeholder='Product Price'
                onChange={(e) => setItemPrice(e.target.value)}
                value={itemPrice}
              /><br/>

              {isColorEnabled && <select>
                <option value="red">Red</option>
                <option value="red">Blue</option>
                <option value="red">Green</option>
                </select>}<br/>

              <input
                type="file"
                className='form-control'
                onChange={(e)=>{
                  const file = e.target.files[0]
                  if(file){
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
              <input type="button" value="Change Color" onClick={enableChangeColor} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProducts
