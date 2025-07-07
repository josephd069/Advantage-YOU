// src/components/FacetedFilters.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function FacetedFilters({ items, onFilter }) {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [selBrands, setSelBrands] = useState([]);
  const [selSizes, setSelSizes] = useState([]);
  const [selColors, setSelColors] = useState([]);

  const containerRef = useRef();

  useEffect(() => {
    setBrands([...new Set(items.map(i => i.brand))]);
    setSizes([...new Set(items.map(i => i.size))]);
    setColors([...new Set(items.filter(i => i.color).map(i => i.color))]);
  }, [items]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggle = (value, list, setList) =>
    setList(list.includes(value)
      ? list.filter(v => v !== value)
      : [...list, value]
    );

  const apply = () => {
    let result = items;
    if (selBrands.length) result = result.filter(i => selBrands.includes(i.brand));
    if (selSizes.length)  result = result.filter(i => selSizes.includes(i.size));
    if (selColors.length) result = result.filter(i => selColors.includes(i.color));
    onFilter(result);
    setOpen(false);
  };

  const reset = () => {
    setSelBrands([]);
    setSelSizes([]);
    setSelColors([]);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
      >
        Filters ▾
      </button>

      {open && (
        <div className="absolute mt-2 w-64 bg-white border rounded shadow-lg z-20">
          <div className="p-4 space-y-4">
            {/* Brand */}
            <div>
              <h4 className="font-semibold mb-1">Brand</h4>
              {brands.map(b => (
                <label key={b} className="block">
                  <input
                    type="checkbox"
                    checked={selBrands.includes(b)}
                    onChange={() => toggle(b, selBrands, setSelBrands)}
                    className="mr-2"
                  />
                  {b}
                </label>
              ))}
            </div>

            {/* Size */}
            <div>
              <h4 className="font-semibold mb-1">Size</h4>
              {sizes.map(s => (
                <label key={s} className="block">
                  <input
                    type="checkbox"
                    checked={selSizes.includes(s)}
                    onChange={() => toggle(s, selSizes, setSelSizes)}
                    className="mr-2"
                  />
                  {s}
                </label>
              ))}
            </div>

            {/* Color (if any) */}
            {colors.length > 0 && (
              <div>
                <h4 className="font-semibold mb-1">Color</h4>
                {colors.map(c => (
                  <label key={c} className="block">
                    <input
                      type="checkbox"
                      checked={selColors.includes(c)}
                      onChange={() => toggle(c, selColors, setSelColors)}
                      className="mr-2"
                    />
                    {c}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-4 py-2 border-t">
            <button
              onClick={reset}
              className="text-sm text-gray-600 hover:underline"
            >
              Reset
            </button>
            <button
              onClick={apply}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
