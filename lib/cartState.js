import { createContext } from 'react';
import { useContext, useState } from 'react/cjs/react.development';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is a custom provider
  // we will use it to store data (state) and functionality (updaters)
  // anyone can access through the consumer

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }
  function closeCart() {
    setCartOpen(false);
  }
  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// custom hook to access cartState
function useCart() {
  // use a consumer to access local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
