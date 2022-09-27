import { useQuery } from 'react-query';
import { useUserInfo } from 'components/providers/Auth';
import { QueryKey } from 'components/providers/Query';
import fetchCartItems from './actions/fetch-cart-items';
import updateProduct from './actions/update-product';
import removeFromCart from './actions/remove-from-cart';

export default function useCartState() {
  const { user } = useUserInfo();
  const { data } = useQuery([QueryKey.FETCH_CART_ITEMS], () => fetchCartItems(user.$id));

  return {
    products: data,
    updateProduct,
    removeFromCart,
  };
}
