// src/pages/AdminLogin.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // env variable for deployment
  // const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crochet-backend-gii9.onrender.com';
  const API_BASE_URL = import.meta.env?.VITE_API_URL ?? "https://crochet-backend-gii9.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, { password });

      if (res.data.success) {
        localStorage.setItem('admin-auth', 'true'); // Save login status
        navigate('/admin/orders');
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-rose-800 mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-rose-800 hover:bg-rose-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
