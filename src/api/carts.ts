import { Query } from 'appwrite';
import { CartModel } from 'models/cart';
import { getAppWrite } from './base';

const { REACT_APP_COLLECTION_CARTS } = process.env;

const cartsApi = {
  getByUser: async (user: string) => {
    const response = await getAppWrite().database.listDocuments(
      REACT_APP_COLLECTION_CARTS,
      [
        Query.equal('user', user),
      ],
    );
    return response.documents[0];
  },
  create: (cart: CartModel, owner: string): Promise<CartModel> => {
    return getAppWrite().database.createDocument(
      REACT_APP_COLLECTION_CARTS,
      'unique()',
      cart,
      [`user:${owner}`],
      [`user:${owner}`],
    );
  },
  update: (cart: Partial<CartModel>): Promise<CartModel> => {
    return getAppWrite().database.updateDocument(
      REACT_APP_COLLECTION_CARTS,
      cart.$id,
      cart,
    );
  },
};

export default cartsApi;
