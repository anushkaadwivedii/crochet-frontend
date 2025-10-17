// // src/pages/Shop.jsx
// import { useState, useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useLocation } from 'react-router-dom';

// import bao from '../assets/bao.JPG';
// import bearKeychain from '../assets/bear-keychain.JPG';
// import bearPlush from '../assets/bear-plush.PNG';
// import beeKeychain from '../assets/bee-keychain.JPG';
// import bowKeychain from '../assets/bow-keychain.PNG';
// import ghost from '../assets/ghost.JPG';
// import heartPillow from '../assets/heart-pillow.JPG';
// import heartTote from '../assets/heart-tote.jpg';
// import jigglypuff from '../assets/jigglypuff.JPG';
// import miniFlowerPot from '../assets/mini-flower-pot.JPG';
// import octopusKeychain from '../assets/octopus-keychain.JPG';
// import octopus from '../assets/octopus.JPG';
// import penguin from '../assets/penguin.JPG';
// import turtle from '../assets/turtle.JPG';

// // Mapping names to local images
// const imageMap = {
//   'Bao Plush': bao,
//   'Bear Keychain': bearKeychain,
//   'Bear Plush': bearPlush,
//   'Bee Keychain': beeKeychain,
//   'Bow Keychain': bowKeychain,
//   'Ghost Plush': ghost,
//   'Heart Pillow': heartPillow,
//   'Heart Tote': heartTote,
//   'Jigglypuff': jigglypuff,
//   'Mini Flower Pot': miniFlowerPot,
//   'Octopus Keychain': octopusKeychain,
//   'Octopus Plush': octopus,
//   'Penguin Plush': penguin,
//   'Turtle Plush': turtle,
// };

// export default function Shop({ products, cart, addToCart, increaseQty, decreaseQty }) {
//   const location = useLocation();
//   const [message, setMessage] = useState(location.state?.message || '');

//   // Add AOS and clear message
//   useEffect(() => {
//     AOS.init({ duration: 1000 });

//     if (message) {
//       const timer = setTimeout(() => setMessage(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   // Add local images to backend products
//   const productsWithImages = products.map((p) => ({
//     ...p,
//     image: imageMap[p.name] || '',
//   }));

//   return (
//     <div className="bg-pink-50 py-10 px-6 min-h-screen pt-40">
//       {message && (
//         <div className="mb-4 text-center text-red-600 font-semibold">
//           {message}
//         </div>
//       )}

//       <h1 className="text-4xl font-bold text-center text-rose-800 mb-10">Shop the Collection</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
//         {productsWithImages.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
//             data-aos="fade-up"
//           >
//             <div className="w-full aspect-[4/5] overflow-hidden mb-4">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-contain rounded-lg"
//               />
//             </div>

//             <div className="text-left w-full">
//               <p className="text-sm text-gray-600">${product.price}</p>
//               <h2 className="text-lg font-bold text-rose-800 mb-2">{product.name}</h2>
//             </div>

//             {cart[product._id] ? (
//               <div className="flex items-center gap-3 mt-auto">
//                 <button onClick={() => decreaseQty(product._id)} className="px-3 py-1 bg-rose-800 text-white rounded-full">-</button>
//                 <span className="text-rose-800 font-semibold">{cart[product._id]}</span>
//                 <button onClick={() => increaseQty(product._id)} className="px-3 py-1 bg-rose-800 text-white rounded-full">+</button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => addToCart(product._id)}
//                 className="bg-rose-800 hover:bg-rose-500 text-white py-2 px-4 rounded-lg mt-auto"
//               >
//                 Add to Cart
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';

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

export default function Shop({ cart, addToCart, increaseQty, decreaseQty }) {
  const [products, setProducts] = useState([]);

  // env variable for deployment
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const withImages = data.map((p) => ({
          ...p,
          image: imageMap[p.name] || '',
        }));
        setProducts(withImages);
      })
      .catch((err) => {
        console.error(' Failed to load products:', err);
      });
    }, [API_BASE_URL]);

  return (
    <div className="min-h-screen bg-pink-50 py-20 px-6 max-w-7xl mx-auto pt-40">
      <h1 className="text-4xl font-bold text-rose-800 mb-10">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const quantity = cart[String(product._id)] || 0;

          return (
            <div key={product._id} className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-96 h-96 object-contain mb-4 rounded border"
              />
              <h2 className="text-lg font-semibold text-rose-800 mb-1">{product.name}</h2>
              <p className="text-gray-700 mb-2">${product.price}</p>

              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(String(product._id))}
                  className="bg-rose-800 hover:bg-rose-500 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(String(product._id))}
                    className="bg-rose-800 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => increaseQty(String(product._id))}
                    className="bg-rose-800 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
