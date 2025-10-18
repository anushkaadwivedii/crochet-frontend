import { useState } from 'react';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

export default function Navbar({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-pink-100 shadow">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-6 h-20 md:h-28">
        
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img 
            src={logo} 
            alt="Logo" 
            className="h-20 md:h-36 object-contain transition-all duration-300" 
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-20 items-center text-lg md:text-xl text-rose-800 font-medium">
            <li><Link to="/" className="hover:text-rose-500">Home</Link></li>
            <li><Link to="/shop" className="hover:text-rose-500">Shop</Link></li>
            <li><Link to="/about" className="hover:text-rose-500">About Me</Link></li>
            <li><Link to="/contact" className="hover:text-rose-500">Contact</Link></li>
          </ul>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative hidden md:block">
          <ShoppingCartIcon className="h-9 w-9 text-rose-800 hover:text-rose-500" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-sm bg-red-500 text-white rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-rose-800 hover:text-rose-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-pink-50 border-t border-rose-200">
          <ul className="flex flex-col items-center gap-4 py-6 text-lg text-rose-800 font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Me</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative flex items-center gap-2">
                <ShoppingCartIcon className="h-7 w-7 text-rose-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
