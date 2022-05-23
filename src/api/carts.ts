import { CartModel } from 'models/cart';
import { getAppWrite } from './base';

const { REACT_APP_COLLECTION_CARTS } = process.env;

const cartsApi = {
  create: async (cart: CartModel) => {
    return getAppWrite().database.createDocument(
      REACT_APP_COLLECTION_CARTS,
      'unique()',
      cart,
    );
  },
  update: (cart: Partial<CartModel>) => {
    return getAppWrite().database.updateDocument(
      REACT_APP_COLLECTION_CARTS,
      cart.$id,
      cart,
    );
  },
};

export default cartsApi;
