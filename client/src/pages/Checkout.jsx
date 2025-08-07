import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Checkout() {

    const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handlePayment() {
    axios.post('http://localhost:3000/razorpay', {
      amount: 50000, // Rs.500 in paise
      currency: 'INR',
      receipt: 'receipt#123',
      payment_capture: 1
    })
    .then((response) => {
      const data = response.data;

      const options = {
        key: "rzp_test_VlWCPpJFwejFle",
        amount: data.amount,
        currency: data.currency,
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: data.id, // order ID from server
        handler: function (response) {
          alert("Payment successful!");
          console.log("Razorpay Response:", response);
          setOrderDetails(response);
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9746801032"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    })
    .catch((error) => {
      console.error("Payment initiation failed", error);
      alert("Unable to process payment. Please try again.");
    });
  }

  return (
    <div>
      <h1>Checkout - private</h1>
      <button onClick={handlePayment}>Pay</button>
      <h1>{orderDetails.razorpay_payment_id}</h1>
      <h1>{orderDetails.razorpay_order_id}</h1>
      <h1>{orderDetails.razorpay_signature}</h1>
    </div>
  );
}

export default Checkout;
