import { Query } from 'appwrite';
import { ProductModel } from 'models/product';
import { ImageGravity, ListResponse } from 'models/app-write';
import { getAppWrite } from './base';

const { REACT_APP_PRODUCTS_COLLECTION } = process.env;

const productsApi = {
  listByCategory: (subCategory: string): Promise<ListResponse<ProductModel>> => {
    return getAppWrite()
      .database
      .listDocuments(
        REACT_APP_PRODUCTS_COLLECTION,
        [Query.equal('subCategory', subCategory)],
      );
  },
  get: (product: string): Promise<ProductModel> => {
    return getAppWrite().database.getDocument(REACT_APP_PRODUCTS_COLLECTION, product);
  },
  fetchThumbnail: (bucket: string, image: string): URL => {
    return getAppWrite()
      .storage
      .getFilePreview(bucket, image, 80, 80, ImageGravity.TOP_LEFT, 50);
  },
  fetchPhoto: (bucket: string, image: string, width: number): URL => {
    return getAppWrite()
      .storage
      .getFilePreview(
        bucket,
        image,
        width,
        undefined,
        ImageGravity.TOP_LEFT,
        100,
      );
  },
};

export default productsApi;
