// src/pages/PaymentPage.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PaymentPage({ cart, setCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { formInfo, cart: navCart } = location.state || {}; 
  const effectiveCart = navCart || cart || {};
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [processing, setProcessing] = useState(false);

  // env variable for deployment
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://crochet-backend-gii9.onrender.com";

  useEffect(() => {
    AOS.init({ duration: 800 });

    if ((!navCart || Object.keys(navCart).length === 0) && (!cart || Object.keys(cart).length === 0)) {
      navigate('/checkout', { replace: true, state: { message: 'Please complete checkout before payment.' } });
      return;
    }

    
    setLoadingProducts(true);
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products for payment page:', err);
        setLoadingProducts(false);
      });
  }, [API_BASE_URL, cart, navCart, navigate]);

  const cartItems = Object.entries(effectiveCart).map(([id, qty]) => {
    const prod = products.find((p) => String(p._id) === String(id));
    return {
      productId: id,
      name: prod?.name || 'Unknown product',
      price: Number(prod?.price) || 0,
      quantity: qty,
    };
  });

  const totalPrice = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const totalItems = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  const submitOrderToBackend = async (paymentDetails) => {
    try {
      const itemsForBackend = cartItems.map(({ productId, quantity }) => ({ productId, quantity }));
      const payload = {
        ...formInfo,
        items: itemsForBackend,
        payment: {
          provider: 'paypal',
          details: paymentDetails, 
        },
      };

      const res = await axios.post(`${API_BASE_URL}/api/orders`, payload);
      console.log('Order saved to backend:', res.data);
      return res.data;
    } catch (err) {
      console.error('Failed to save order to backend:', err);
      return null;
    }
  };

  if (loadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 pt-40">
        <p className="text-rose-800">Loading payment details…</p>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen py-12 px-6 pt-40">
      <h1 className="text-4xl font-bold text-rose-800 text-center mb-10" data-aos="fade-down">
        Payment
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg" data-aos="fade-right">
          <h2 className="text-2xl font-semibold text-rose-800 mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">No items found in cart.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((it) => (
                <div key={it.productId} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-rose-800">{it.name}</p>
                    <p className="text-sm text-gray-500">Qty: {it.quantity}</p>
                  </div>
                  <div className="font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
                </div>
              ))}

              <div className="flex justify-between mt-4 font-semibold text-rose-800">
                <div>Total ({totalItems} items)</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">Pay securely with PayPal.</p>

                {/* PayPal button */}
                <div className="mt-4">
                  <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalPrice.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      setProcessing(true);
                      try {
                        const details = await actions.order.capture();
                        console.log('PayPal capture details:', details);

                        await submitOrderToBackend(details);

                        if (typeof setCart === 'function') {
                          setCart({});
                          localStorage.removeItem('cart'); 
                        }

                        navigate('/thankyou', { replace: true });
                      } catch (err) {
                        console.error('Error during capture/submit:', err);
                        alert('Payment succeeded but something went wrong finalizing the order. Please contact support.');
                      } finally {
                        setProcessing(false);
                      }
                    }}
                    onError={(err) => {
                      console.error('PayPal error:', err);
                      alert('Payment failed. Please try again or use another payment method.');
                    }}
                  />
                </div>

                {processing && <p className="mt-3 text-gray-600">Processing payment…</p>}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-left">
            <h2 className="text-2xl font-semibold text-rose-800 mb-4">Shipping Info</h2>

            {formInfo ? (
                <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Name:</strong> {formInfo.name}</p>
                <p><strong>Email:</strong> {formInfo.email}</p>
                <p><strong>Phone:</strong> {formInfo.phone}</p>
                <p><strong>Address:</strong> {formInfo.address}</p>
                <p><strong>Notes:</strong> {formInfo.notes || '—'}</p>

                {/* Edit shipping button */}
                <button
                    onClick={() => navigate('/checkout', { state: { formInfo, cart: effectiveCart } })}
                    className="mt-4 bg-rose-800 hover:bg-rose-500 text-white px-4 py-2 rounded-lg"
                >
                    Edit Shipping Info
                </button>
                </div>
            ) : (
                <p className="text-gray-600">No shipping information provided.</p>
            )}
            </div>
      </div>
    </div>
  );
}
