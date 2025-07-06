import React from 'react';
import { useLocation } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function SearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('q') || '';

  const results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">
        Search results for “{query}”
      </h2>
      {results.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {results.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-600">No products found.</p>
      )}
    </div>
  );
}