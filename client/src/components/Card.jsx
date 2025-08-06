import axios from 'axios'
import React, { useState } from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Card(props) {
    const [isAdded, setIsAdded] = useState(true)

    function handleAddToCart(item){
        axios.post(`${BACKEND_URL}/addtocart/${item}`,{}, {withCredentials: true})
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.error(err)
            })
    }

    return (
        <div className="card">
            <img
                src={`${BACKEND_URL}/images/products/${props.passedProduct._id}.jpg`}
                className="card-img-top"
                alt="Fissure in Sandstone"
            />
            <div className="card-body">
                <h5 className="card-title">{props.passedProduct.itemName}</h5>
                <p className="card-text">
                    {props.passedProduct.itemDesc}
                </p>
                <p className="card-text">
                    Price: {props.passedProduct.itemPrice}
                </p>
                <a href="#!" onClick={()=>handleAddToCart(props.passedProduct._id)} className={isAdded ? "btn btn-secondary" : "btn btn-primary"} data-mdb-ripple-init="">
                    {isAdded ? "Added":"Add to cart"}
                </a>
            </div>
        </div>
    )
}

export default Card
