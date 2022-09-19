import { CartModel } from 'models/cart';
import authApi from 'api/auth';
import cartsApi from 'api/carts';
import { addTimeStamp } from 'helpers/time-trace';

export async function checkRequirements (): Promise<CartModel> {
  let currentSession = await authApi.getCurrentSession();
  if (!currentSession) {
    currentSession = await authApi.createAnonymousSession();
  }

  let currentCart = await cartsApi.getByUser(currentSession.userId);
  if (!currentCart) {
    const user = currentSession.userId;
    const cartPayload = addTimeStamp({ user } as CartModel);
    currentCart = await cartsApi.create(cartPayload, user);
  }

  return currentCart as CartModel;
}
