import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="inset-shadow-sm/30 bg-green-100 py-15">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About Advantage-YOU</h3>
          <p className="text-sm leading-relaxed">
            Advantage-YOU is your premier online tennis shop, offering pro-grade rackets, accessories, and apparel. Elevate your game with our curated selection and exceptional service.
          </p>
        </div>

        {/* Explore Section */}
        <div className='mx-75'>
          <h3 className="text-xl font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/catalog/rackets" className="hover:underline">Rackets</Link></li>
            <li><Link to="/catalog/grips" className="hover:underline">Grips & Strings</Link></li>
            <li><Link to="/catalog/apparel" className="hover:underline">Apparel</Link></li>
            <li><Link to="/catalog/bags" className="hover:underline">Bags</Link></li>
            <li><Link to="/catalog/balls" className="hover:underline">Balls</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Advantage-YOU. All rights reserved.
      </div>
    </footer>
  );
}
