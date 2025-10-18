import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  // env variable for deployment
  // const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crochet-backend-gii9.onrender.com';
  const API_BASE_URL = import.meta.env?.VITE_API_URL ?? "https://crochet-backend-gii9.onrender.com";

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin-auth');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    axios.get(`${API_BASE_URL}/api/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Failed to fetch orders:', err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    // navigate('/admin');
    navigate('/');
  };

  const toggleStatus = async (orderId) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/orders/${orderId}/status`);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: order.status === 'completed' ? 'pending' : 'completed' }
            : order
        )
      );
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };  

return (
  <div className="min-h-screen bg-pink-50 p-8 pt-40">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-rose-800">Admin Orders</h1>
      <button
        onClick={handleLogout}
        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    <div className="flex gap-4 mb-6">
      <button
        onClick={() => setShowCompleted(false)}
        className={`px-4 py-2 rounded ${!showCompleted ? 'bg-rose-800 text-white' : 'bg-gray-200 text-black'}`}
      >
        Pending Orders
      </button>
      <button
        onClick={() => setShowCompleted(true)}
        className={`px-4 py-2 rounded ${showCompleted ? 'bg-rose-800 text-white' : 'bg-gray-200 text-black'}`}
      >
        Completed Orders
      </button>
    </div>

    {orders.length === 0 ? (
      <p className="text-rose-700">No orders found.</p>
    ) : (
      <div className="space-y-4">
        {orders
          .filter(order => showCompleted ? order.status === 'completed' : order.status === 'pending')
          .map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Notes:</strong> {order.notes || '—'}</p>
              <p><strong>Items:</strong></p>

              <ul className="ml-4 list-disc">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productId
                      ? `${item.productId.name} ($${item.productId.price}) — Qty: ${item.quantity}`
                      : `Unknown product — Qty: ${item.quantity}`}
                  </li>
                ))}
              </ul>

              {/* <button
                onClick={() => handleDelete(order._id)}
                className="mt-3 bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-500"
              >
                Mark as Complete
              </button> */}

              <p><strong>Status:</strong>{' '}
                <span className={`font-semibold ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.status}
                </span>
              </p>
              <button
                onClick={() => toggleStatus(order._id)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Mark as {order.status === 'completed' ? 'Pending' : 'Completed'}
              </button>

              <p className="text-sm text-gray-500 mt-2">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    )}
  </div>
)};
