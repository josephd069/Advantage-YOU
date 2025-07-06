import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartState } from '../components/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const navigate = useNavigate();
  const { items } = useCartState();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="sticky top-0 z-30 bg-green-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        <Link to="/Advantage-YOU" className="text-2xl font-bold text-green-600 hover:text-green-700">
          Advantage-YOU
        </Link>
        <div className="flex-1 mx-6">
          <form onSubmit={e => { e.preventDefault(); }}>
            <input
              type="text"
              placeholder="Search products..."
              onKeyDown={e => e.key === 'Enter' && navigate(`/search?q=${encodeURIComponent(e.target.value)}`)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </form>
        </div>
        <button onClick={() => navigate('/cart')} className="relative">
          <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}