import { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';
import { CartItemModel } from 'models/cart-item';
import cartsItemsApi from 'api/cart-items';
import { addTimeStamp } from 'helpers/time-trace';
import { useAuth } from '../Auth';
import { CartModel } from '../../../models/cart';
import cartsApi from '../../../api/carts';

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
  const { session, createAnonymousSession } = useAuth();
  const [cart, setCart] = useState<CartModel | undefined>(undefined);
  const [products, setProducts] = useState<CartItemModel[]>([]);

  const checkRequirements = useCallback(async () => {
    let patchSession = undefined;
    if (!session) {
      patchSession = await createAnonymousSession();
    }

    if (!cart) {
      const cartPayload = addTimeStamp({
        user: (session || patchSession).$id,
      } as CartModel);
      const newCart = await cartsApi.create(cartPayload);
      setCart(newCart as CartModel);
      return newCart;
    }
  }, [session, cart]);

  const addToCart = useCallback(async (product: CartItemModel) => {
    const patchCart = await checkRequirements();
    const stampedProduct = addTimeStamp({ ...product, cart: (cart || patchCart).$id });
    setProducts((old) => old.concat(stampedProduct));
    await cartsItemsApi.create(stampedProduct);
  }, [checkRequirements]);

  const updateProduct = useCallback(async (product: CartItemModel) => {
    await checkRequirements();
    const stampedProduct = addTimeStamp(product);
    setProducts((old) => old.reduce((list, prod) => {
      if (prod.$id === product.$id) return list.concat(stampedProduct);
      return list.concat(prod);
    }, []));
    await cartsItemsApi.update(stampedProduct);
  }, [checkRequirements]);

  const removeFromCart = useCallback(async (id: string) => {
    await checkRequirements();
    setProducts((old) => old.filter((prod) => prod.$id !== id));
    await cartsItemsApi.remove(id);
  }, []);

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
