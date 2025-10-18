// src/pages/Cart.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import bao from '../assets/bao.JPG';
import bearKeychain from '../assets/bear-keychain.JPG';
import bearPlush from '../assets/bear-plush.PNG';
import beeKeychain from '../assets/bee-keychain.JPG';
import bowKeychain from '../assets/bow-keychain.PNG';
import ghost from '../assets/ghost.JPG';
import heartPillow from '../assets/heart-pillow.JPG';
import heartTote from '../assets/heart-tote.jpg';
import jigglypuff from '../assets/jigglypuff.JPG';
import miniFlowerPot from '../assets/mini-flower-pot.JPG';
import octopusKeychain from '../assets/octopus-keychain.JPG';
import octopus from '../assets/octopus.JPG';
import penguin from '../assets/penguin.JPG';
import turtle from '../assets/turtle.JPG';

const imageMap = {
  'Bao Plush': bao,
  'Bear Keychain': bearKeychain,
  'Bear Plush': bearPlush,
  'Bee Keychain': beeKeychain,
  'Bow Keychain': bowKeychain,
  'Ghost Plush': ghost,
  'Heart Pillow': heartPillow,
  'Heart Tote': heartTote,
  'Jigglypuff': jigglypuff,
  'Mini Flower Pot': miniFlowerPot,
  'Octopus Keychain': octopusKeychain,
  'Octopus Plush': octopus,
  'Penguin Plush': penguin,
  'Turtle Plush': turtle,
};

export default function Cart({ cart, increaseQty, decreaseQty }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Use deployed backend URL for GitHub Pages
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crochet-backend-gii9.onrender.com';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const withImages = data.map(p => ({
          ...p,
          image: imageMap[p.name] || '',
        }));
        setProducts(withImages);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, [API_BASE_URL]);

  const cartItems = products.filter((p) => Object.keys(cart).includes(String(p._id)));

  const total = cartItems.reduce((sum, p) => sum + p.price * (cart[p._id] || 0), 0);

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-6 flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto pt-40">
      {/* Left: Cart Items */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold text-rose-800 mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain rounded-md border"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-rose-800">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  ${item.price} × {cart[item._id] || 0}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-2 py-1 bg-rose-800 text-white rounded"
                >
                  -
                </button>
                <span>{cart[item._id] || 0}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-2 py-1 bg-rose-800 text-white rounded"
                >
                  +
                </button>
              </div>

              <div className="text-right font-semibold text-rose-800">
                ${(item.price * (cart[item._id] || 0)).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right: Summary */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-xl font-bold text-rose-800 mb-4">Summary</h2>
        <div className="text-gray-700 mb-4">
          <p>Total items: {Object.values(cart).reduce((a, b) => a + b, 0)}</p>
          <p>
            Total price:{' '}
            <span className="font-semibold text-rose-800">${total.toFixed(2)}</span>
          </p>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="mt-6 w-full bg-rose-800 hover:bg-rose-500 text-white py-3 rounded-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
