import { CartItemModel } from 'models/cart-item';
import { getAppWrite } from './base';

const { REACT_APP_COLLECTION_CART_ITEMS } = process.env;

const cartsItemsApi = {
  create: (cart: CartItemModel) => {
    return getAppWrite().database.createDocument(
      REACT_APP_COLLECTION_CART_ITEMS,
      'unique()',
      cart,
    );
  },
  update: (cart: Partial<CartItemModel>) => {
    return getAppWrite().database.updateDocument(
      REACT_APP_COLLECTION_CART_ITEMS,
      cart.$id,
      cart,
    );
  },
  remove: (cartItemId: string) => {
    return getAppWrite().database.deleteDocument(
      REACT_APP_COLLECTION_CART_ITEMS,
      cartItemId,
    );
  }
};

export default cartsItemsApi;
