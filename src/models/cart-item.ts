import { BaseModel, TimeTrace } from './app-write';

export interface CartItemModel extends BaseModel, TimeTrace {
  name: string;
  price: number;
  quantity: number;
  cart: string;
  bucket: string;
  thumbnail: string;
}
