import { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';
import { CartItemModel } from 'models/cart-item';

interface CartContext {
  products: CartItemModel[];
  addToCart: (product: CartItemModel) => void;
  updateProduct: (product: CartItemModel) => void;
  removeFromCart: (id: string) => void;
}

const context = createContext<CartContext>(undefined);
const { Provider } = context;

const CartProvider: FC = (props) => {
  const { children } = props;
  const [products, setProducts] = useState<CartItemModel[]>([]);

  const addToCart = useCallback((product: CartItemModel) => {
    setProducts((old) => old.concat(product));
  }, []);

  const updateProduct = useCallback((product: CartItemModel) => (
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
