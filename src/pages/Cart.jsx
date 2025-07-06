import React from 'react';
import { useCartState, useCartDispatch } from '../components/CartContext';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-green-600 hover:underline">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center space-x-6 border rounded-lg p-4"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <Link
                  to={`/product/${item.id}`}
                  className="text-lg font-medium hover:underline"
                >
                  {item.name}
                </Link>
                <p className="text-gray-500">${item.price.toFixed(2)} each</p>

                <div className="flex items-center mt-3 space-x-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QTY',
                        payload: { id: item.id, qty: item.qty - 1 },
                      })
                    }
                    disabled={item.qty <= 1}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    –
                  </button>
                  <span className="px-3 text-gray-700">{item.qty}</span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QTY',
                        payload: { id: item.id, qty: item.qty + 1 },
                      })
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="text-xl font-semibold">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })
                  }
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5 mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end items-center space-x-6 pt-6 border-t">
            <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
