import { CartItemModel } from 'models/cart-item';
import cartsApi from 'api/carts';
import cartsItemsApi from 'api/cart-items';

export default async function fetchCartItems(userId: string): Promise<CartItemModel[]> {
  const cart = await cartsApi.getByUser(userId);

  if (cart) {
    const products = await cartsItemsApi.listByCart(cart.$id);
    return products.documents as CartItemModel[];
  }

  return [];
}
