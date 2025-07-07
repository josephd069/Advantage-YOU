import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import { useCartDispatch } from '../components/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const dispatch = useCartDispatch();

  if (!product) return <div className="p-4">Product not found</div>;

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { item: { id: product.id, name: product.name, price: product.price, qty: 1, options: {} } }
    });
  };

  return (
    <div className="p-6 max-w-4xl h-full mx-auto flex flex-col md:flex-row gap-6">
      <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 h-auto object-cover" />
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        <button onClick={addToCart} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}