import { BaseModel } from './app-write';

export interface ProductModel extends BaseModel {
  name: string;
  description: string;
  price?: number;
  images: string[];
  thumbnail: string;
  subCategory: string;
  team: string;
  store: string;
  bucket: string;
}
