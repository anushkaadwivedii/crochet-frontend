// src/pages/ThankYou.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function ThankYou() {
  useEffect(() => {
    confetti({
      particleCount: 1000,
      spread: 150,
      origin: { y: 0.4 },
    });
  }, []);

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-rose-800 mb-6">Thank You for Your Order!</h1>
      <p className="text-lg text-rose-700 mb-8 text-center max-w-xl">
        We've received your order! You will be contacted via messages to confirm details and provide payment information. We'll get started on packaging your crochet creation right away!
      </p>
      <Link to="/" className="bg-rose-800 hover:bg-rose-500 text-white px-6 py-3 rounded-lg">
        Back to Home
      </Link> 
    </div>
  );
}
