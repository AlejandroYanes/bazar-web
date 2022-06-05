import { Query } from 'appwrite';
import { CartItemModel } from 'models/cart-item';
import { getAppWrite } from './base';

const { REACT_APP_COLLECTION_CART_ITEMS } = process.env;

const cartsItemsApi = {
  listByCart: (cart: string) => {
    return getAppWrite().database.listDocuments(
      REACT_APP_COLLECTION_CART_ITEMS,
      [Query.equal('cart', cart)],
    );
  },
  create: (cartItem: CartItemModel, owner: string) => {
    return getAppWrite().database.createDocument(
      REACT_APP_COLLECTION_CART_ITEMS,
      'unique()',
      cartItem,
      [`user:${owner}`],
      [`user:${owner}`],
    );
  },
  update: (cartItem: Partial<CartItemModel>) => {
    return getAppWrite().database.updateDocument(
      REACT_APP_COLLECTION_CART_ITEMS,
      cartItem.$id,
      cartItem,
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
