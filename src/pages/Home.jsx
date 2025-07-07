import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const cats = ['rackets', 'grips', 'apparel', 'bags', 'balls'];

  return (
    <div>
      <HeroCarousel />
      <div className="max-w-7xl mx-auto py-12 space-y-16">
        {cats.map(cat => {
          const best = products.filter(p => p.category === cat && p.bestSeller).slice(0, 4);
          return (
            <section key={cat}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold capitalize">Best Selling {cat}</h2>
                <Link to={`/catalog/${cat}`} className="text-green-600 hover:animate-[spin_1.8s_linear_infinite] hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {best.map(item => <ProductCard key={item.id} product={item} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  )
}