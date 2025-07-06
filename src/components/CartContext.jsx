import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = {
  items: [] // { id, name, price, qty, options }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
          )
        };
      }
      return { ...state, items: [...state.items, item] };
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      return {
        ...state,
        items: state.items.map(i => (i.id === id ? { ...i, qty } : i))
      };
    }
    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      return { ...state, items: state.items.filter(i => i.id !== id) };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, init => {
    // initialize from localStorage
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : init;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export function useCartState() {
  const context = useContext(CartStateContext);
  if (context === undefined) throw new Error('useCartState must be used within CartProvider');
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) throw new Error('useCartDispatch must be used within CartProvider');
  return context;
}