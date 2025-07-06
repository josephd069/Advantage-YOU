import React from 'react';
import { Link } from 'react-router-dom';
import { useCartDispatch } from '../components/CartContext';

export default function ProductCard({ product }) {
  const dispatch = useCartDispatch();
  const addToCart = () => dispatch({ type: 'ADD_ITEM', payload: { item: { id: product.id, name: product.name, price: product.price, qty: 1, options: {} } } });

  return (
    <div className="border rounded-lg p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`} className="flex-1">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      </Link>
      <p className="font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
      <button onClick={addToCart} className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium">
        Add to Cart
      </button>
    </div>
  )
}