import React, { useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: 'John Doe',
      product: 'Nike Air Max',
      quantity: 2,
      price: 7999,
      status: 'Pending',
    },
    {
      id: 'ORD002',
      customer: 'Sarah Smith',
      product: 'Apple Watch',
      quantity: 1,
      price: 25999,
      status: 'Shipped',
    },
    {
      id: 'ORD003',
      customer: 'Rahul Nair',
      product: 'Sony Headphones',
      quantity: 1,
      price: 19990,
      status: 'Delivered',
    },
  ]);

  const handleDelete = (index) => {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
  };

  const handleEdit = (index) => {
    const order = orders[index];
    alert(`Edit clicked for Order ID: ${order.id}`);
    // You can open a modal or navigate to an edit page here
  };

  return (
    <div className="container mt-4">
      <h4>Order List</h4>
      <table className="table table-bordered table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price ₹</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No orders found.</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
