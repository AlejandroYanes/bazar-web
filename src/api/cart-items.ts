import { CartItemModel } from 'models/cart-item';
import { getAppWrite } from './base';

const { REACT_APP_COLLECTION_CART_ITEMS } = process.env;

const cartsApi = {
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
};

export default cartsApi;
