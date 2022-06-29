import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { CartModel } from 'models/cart';
import { CartItemModel } from 'models/cart-item';
import cartsApi from 'api/carts';
import cartsItemsApi from 'api/cart-items';
import { addTimeStamp } from 'helpers/time-trace';
import { useAuth } from '../Auth';
import authApi from '../../../api/auth';

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
  const { session } = useAuth();
  const [cart, setCart] = useState<CartModel | undefined>(undefined);
  const [products, setProducts] = useState<CartItemModel[]>([]);

  const checkRequirements = useCallback(async () => {
    let patchSession = undefined;
    if (!session) {
      patchSession = await authApi.createAnonymousSession();
    }

    if (!cart) {
      const user = (session || patchSession).userId;
      const cartPayload = addTimeStamp({ user } as CartModel);
      const newCart = await cartsApi.create(cartPayload, user);
      setCart(newCart as CartModel);
      return newCart;
    }
  }, [session, cart]);

  const addToCart = useCallback(async (product: CartItemModel) => {
    const patchCart = (await checkRequirements() as CartModel);
    const stampedProduct = addTimeStamp({ ...product, cart: (cart || patchCart).$id });
    setProducts((old) => old.concat(stampedProduct));
    await cartsItemsApi.create(stampedProduct, (cart || patchCart).user);
  }, [checkRequirements]);

  const updateProduct = useCallback(async (product: CartItemModel) => {
    const stampedProduct = addTimeStamp(product);
    setProducts((old) => old.reduce((list, prod) => {
      if (prod.$id === product.$id) return list.concat(stampedProduct);
      return list.concat(prod);
    }, []));
    await cartsItemsApi.update(stampedProduct);
  }, [checkRequirements]);

  const removeFromCart = useCallback(async (id: string) => {
    setProducts((old) => old.filter((prod) => prod.$id !== id));
    await cartsItemsApi.remove(id);
  }, []);

  const contextValue = useMemo<CartContext>(() => ({
    products,
    addToCart,
    updateProduct,
    removeFromCart,
  }), [products]);

  const initCart = async () => {
    const previousCart = await cartsApi.getByUser(session.userId);
    if (previousCart) {
      setCart(previousCart as CartModel);
      const previousProducts = await cartsItemsApi.listByCart(previousCart.$id);
      setProducts(previousProducts.documents as CartItemModel[]);
    }
  };

  useEffect(() => {
    if (!!session && !cart) {
      initCart();
    }
  }, [session, cart]);

  return (
    <Provider value={contextValue}>
      {children}
    </Provider>
  );
};

export const useCart = () => useContext(context);
export default CartProvider;
