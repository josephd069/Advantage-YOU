import React from 'react';
import { NavLink } from 'react-router-dom';

const categories = ['rackets', 'grips', 'apparel', 'bags', 'balls'];

export default function Navbar() {
  return (
    <nav className="sticky top-16 z-20 bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex justify-center space-x-8 py-3">
          {categories.map(cat => (
            <li key={cat}>
              <NavLink
                to={`/catalog/${cat}`}
                className={({ isActive }) =>
                  `uppercase text-lg p-5 font-medium ${
                    isActive ? 'text-green-600 border-b-2 border-green-600 pb-1' : 'text-gray-700 hover:text-green-600'
                  }`
                }
              >
                {cat}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}