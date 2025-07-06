import React, { useState } from 'react';
import { useCartState, useCartDispatch } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const steps = ['Shipping', 'Payment', 'Confirmation'];

  const handleShipping = e =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  const handlePayment = e =>
    setPayment({ ...payment, [e.target.name]: e.target.value });

  return (
    <div className="max-w-3xl h-screen mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex mb-10">
        {steps.map((label, idx) => (
          <div
            key={label}
            className={`flex-1 text-center pb-2 border-b-2 ${
              step === idx + 1
                ? 'border-green-600 text-green-600 font-semibold'
                : 'border-gray-300 text-gray-500'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <form
          onSubmit={e => {
            e.preventDefault();
            setStep(2);
          }}
          className="space-y-6"
        >
          {['name', 'address', 'email'].map(field => (
            <div key={field}>
              <label className="block font-medium mb-1">
                {field === 'name'
                  ? 'Full Name'
                  : field === 'address'
                  ? 'Address'
                  : 'Email Address'}
              </label>
              <input
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                value={shipping[field]}
                onChange={handleShipping}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={e => {
            e.preventDefault();
            setStep(3);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block font-medium mb-1">Name on Card</label>
            <input
              name="cardName"
              value={payment.cardName}
              onChange={handlePayment}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Card Number</label>
            <input
              name="cardNumber"
              value={payment.cardNumber}
              onChange={handlePayment}
              required
              pattern="\d{16}"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Expiry (MM/YY)</label>
              <input
                name="expDate"
                value={payment.expDate}
                onChange={handlePayment}
                required
                pattern="(0[1-9]|1[0-2])\/\d{2}"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">CVV</label>
              <input
                name="cvv"
                value={payment.cvv}
                onChange={handlePayment}
                required
                pattern="\d{3}"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-600 hover:underline"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2">
            {items.map(i => (
              <div key={i.id} className="flex justify-between">
                <span>{i.name} x{i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-gray-600 hover:underline"
            >
              Back
            </button>
            <button
              onClick={() => {
                dispatch({ type: 'CLEAR_CART' });
                navigate('/');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
