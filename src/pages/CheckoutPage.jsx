// src/pages/Checkout.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formInfo, setFormInfo] = useState({
    name: '',
    email: '',
    address: '',
    notes: '',
    phone: '',
  });

  // env variable for deployment
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://crochet-backend-gii9.onrender.com";

  useEffect(() => {
    AOS.init({ duration: 1000 });

    if (!cart || Object.keys(cart).length === 0) {
      navigate('/shop', { state: { message: 'Cart is empty! Add items to continue.' } });
    }

    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(' Failed to fetch products in checkout:', err));
  }, [cart, navigate, API_BASE_URL]);

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formInfo.name && formInfo.phone && formInfo.address) {
      try {
        // const response = await axios.post('http://localhost:5050/api/orders', {
        //   ...formInfo,
        //   cart,
        // });

        const items = Object.entries(cart).map(([productId, quantity]) => ({
          productId,
          quantity,
        }));
        
        const response = await axios.post(`${API_BASE_URL}/api/orders`, {
          ...formInfo,
          items,
        });
        

        console.log('Order placed:', response.data);
        console.log("🧺 Clearing cart after order...");//debug

        setCart({}); //clear cart after thanks
        navigate('/thankyou');
      } catch (err) {
        console.error('Failed to submit order:', err.message);
        alert('Something went wrong while placing your order. Please try again.');
      }
    }
  };

  // const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  // const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
  //   const product = products.find(p => String(p._id) === id);
  //   return sum + (product?.price || 0) * qty;
  // }, 0);

  //corrected string conversion
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  //debug
  console.log("Products:", products);
  console.log("Cart:", cart);

  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find(p => p._id === id || String(p._id) === id);
    const price = Number(product?.price) || 0;
    return sum + price * qty;
  }, 0);


  return (
    <div className="bg-pink-50 min-h-screen py-12 px-6 pt-40">
      <h1 className="text-4xl font-bold text-rose-800 text-center mb-10" data-aos="fade-down">Checkout</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg" data-aos="fade-right">
          <h2 className="text-2xl font-semibold text-rose-800 mb-4">Shipping Details</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formInfo.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formInfo.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formInfo.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={formInfo.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formInfo.notes}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              rows="3"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-rose-800 hover:bg-rose-500 text-white py-3 rounded-lg"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-left">
          <h2 className="text-2xl font-semibold text-rose-800 mb-4">Order Summary</h2>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: <span className="text-rose-800 font-bold">${totalPrice}</span></p>
        </div>
      </div>
    </div>
  );
}
