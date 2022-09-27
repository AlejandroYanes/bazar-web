import { CartItemModel } from 'models/cart-item';
import cartsItemsApi from 'api/cart-items';
import { addTimeStamp } from 'helpers/time-trace';
import { queryClient, QueryKey } from 'components/providers/Query';

export default async function updateProduct(product: CartItemModel) {
  const stampedProduct = addTimeStamp(product);
  await cartsItemsApi.update(stampedProduct);
  const products: CartItemModel[] = queryClient.getQueryData([QueryKey.FETCH_CART_ITEMS]);
  const updatedList = products.map((prod) => {
    if (prod.$id === product.$id) return stampedProduct;
    return prod;
  }, []);
  queryClient.setQueryData([QueryKey.FETCH_CART_ITEMS], updatedList);
}
