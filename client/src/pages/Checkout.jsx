import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Checkout() {

    const [order, setOrder] = useState({})

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [])

    const options = {
        amount: 10*100,
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1,
    }

    function handlePayment() {
        axios.post(`${BACKEND_URL}/order`, {options})
            .then((res)=>{
                const config = {
                    key: "rzp_test_7MbZB3DswkaLZX",
                    amount: res.data.amount,
                    currency: res.data.currency,
                    name: "Ecommerce",
                    order_id: res.data.id,
                    description: "Test Transaction",
                    handler: function (response) {
                        alert("Payment successful");
                        console.log(response);
                        setOrder(response)
                    },
                    prefill:{
                        name: "Gaurav Kumar",
                        email: "gkumar@in.com",
                        contact: "9999999999"
                    },
                    theme: {
                        color: "#f1730cff"
                    }
                }

                const rzp1 = new window.Razorpay(config)
                rzp1.open()
            })
            .catch((err)=>{
                console.error(err)
            })
    }

    return (
        <div>
            <button onClick={handlePayment}>Pay</button>
            <h1>Payment ID : {order.razorpay_payment_id}</h1>
            <h1>Order ID: {order.razorpay_order_id}</h1>
        </div>
    )
}

export default Checkout
