import React, { useState, useContext } from 'react';
import axios from 'axios'
import {AuthContext} from '../context/AuthContext'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Card(props) {
    const {updateCartCount} = useContext(AuthContext);
    const [addedToCart, setAddedToCart] = useState(false);

    function handleAddToCart(productId) {
        axios.post(`${BACKEND_URL}/addtocart/${productId}`, {}, { withCredentials: true })
            .then((res) => {
                setAddedToCart(true);
                updateCartCount(res.data.products.length);
            })
            .catch(err => console.error(err.response.data));
    }


    return (
        <div className="card h-100">
            <img
                src={`${BACKEND_URL}/images/products/${props.product._id}.jpg`}
                className="card-img-top"
                alt={props.product.itemName}
            />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">{props.product.itemName}</h4>
                    <h5 className="mb-0 text-success">₹{props.product.itemPrice}</h5>
                </div>
                <p className="card-text">{props.product.itemDesc}</p>
                {addedToCart ? (
                    <button className="btn btn-secondary mt-2">
                        Added to Cart
                    </button>
                ) : (
                    <button onClick={() => handleAddToCart(props.product._id)} className="btn btn-warning mt-2">
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}

export default Card;
