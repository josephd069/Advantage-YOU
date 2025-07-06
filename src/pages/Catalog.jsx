// src/pages/Catalog.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import FacetedFilters from '../components/FacetedFilters';

export default function Catalog() {
  const { category } = useParams();
  const allItems = products.filter(p => p.category === category);

  // keep local filtered state
  const [filteredItems, setFilteredItems] = useState(allItems);

  // reset filters if category changes
  useEffect(() => {
    setFilteredItems(allItems);
  }, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold capitalize mb-4 md:mb-0">
          {category}
        </h1>
        <FacetedFilters
          items={allItems}
          onFilter={setFilteredItems}
        />
      </div>

      {/* Product Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products match those filters.</p>
      )}
    </div>
  );
}
