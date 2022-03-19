import { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';
import { CartModel } from '../../../models/cart';

interface CartContext {
  products: CartModel[];
  addToCart: (product: CartModel) => void;
  updateProduct: (product: CartModel) => void;
  removeFromCart: (id: string) => void;
}

const context = createContext<CartContext>(undefined);
const { Provider } = context;

const CartProvider: FC = (props) => {
  const { children } = props;
  const [products, setProducts] = useState<CartModel[]>([]);

  const addToCart = useCallback((product: CartModel) => (
    setProducts((old) => old.concat(product))
  ), []);

  const updateProduct = useCallback((product: CartModel) => (
    setProducts((old) => old.reduce((list, prod) => {
      if (prod.$id === product.$id) return list.concat(product);
      return list.concat(prod);
    }, []))
  ), []);

  const removeFromCart = useCallback((id: string) => (
    setProducts((old) => old.filter((prod) => prod.$id !== id))
  ), []);

  const contextValue = useMemo<CartContext>(() => ({
    products,
    addToCart,
    updateProduct,
    removeFromCart,
  }), [products]);

  return (
    <Provider value={contextValue}>
      {children}
    </Provider>
  );
};

export const useCart = () => useContext(context);
export default CartProvider;
