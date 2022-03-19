import { BaseModel } from './app-write';

export interface CartModel extends BaseModel {
  name: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
