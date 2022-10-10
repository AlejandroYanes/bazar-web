import { NotificationType, showNotification } from '@devland-ui/components';
import { CartItemModel } from 'models/cart-item';
import { ProductModel } from 'models/product';
import cartsItemsApi from 'api/cart-items';
import { addTimeStamp } from 'helpers/time-trace';
import { CustomDispatch, State } from '../types';
import getCurrentCart from './get-current-cart';

export default function addToCart(
  dispatch: CustomDispatch,
  state: State,
  product: ProductModel,
) {
  return async () => {
    try {
      const cart = await getCurrentCart();
      const { quantity } = state;
      const { name, price, bucket, thumbnail } = product;
      const cartItem = {
        name,
        price,
        bucket,
        thumbnail,
        quantity,
      } as CartItemModel;
      const stampedProduct = addTimeStamp({ ...cartItem, cart: cart.$id });
      await cartsItemsApi.create(stampedProduct, cart.user);
      dispatch({ type: 'reset_state' });
      showNotification({
        type: NotificationType.SUCCESS,
        title: name,
        message: 'added to the cart',
      });
    } catch (e) {
      showNotification({
        type: NotificationType.ERROR,
        message: 'failed to add to the cart',
      });
    }
  };
}
