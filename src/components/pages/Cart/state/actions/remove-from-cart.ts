import cartsItemsApi from 'api/cart-items';
import { CartItemModel } from 'models/cart-item';
import { queryClient, QueryKey } from 'components/providers/Query';

export default async function removeFromCart(id: string) {
  await cartsItemsApi.remove(id);
  const products: CartItemModel[] = queryClient.getQueryData([QueryKey.FETCH_CART_ITEMS]);
  const updatedList = products.filter((prod) => prod.$id !== id);
  queryClient.setQueryData([QueryKey.FETCH_CART_ITEMS], updatedList);
}
