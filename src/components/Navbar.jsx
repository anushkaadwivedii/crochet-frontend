import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'; 

export default function Navbar({ cart }) {
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    // <nav className="flex items-center justify-between px-10 py-6 h-32 bg-pink-100 shadow">
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-10 py-6 h-28 bg-pink-100 shadow">

      <img src={logo} alt="Logo" className="h-36" />

      <div className="flex-1 flex justify-center">
        <ul className="flex gap-20 items-center text-xl text-rose-800 font-medium">
          <li>
            <Link to="/" className="hover:text-rose-500">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-rose-500">Shop</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-rose-500">About Me</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-rose-500">Contact</Link>
          </li>
        </ul>
      </div>

      <Link to="/cart" className="relative">
        <ShoppingCartIcon className="h-9 w-9 text-rose-800 hover:text-rose-500" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 text-sm bg-red-500 text-white rounded-full px-1.5">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
