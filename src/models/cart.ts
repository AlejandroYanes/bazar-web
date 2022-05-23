import { BaseModel, TimeTrace } from './app-write';

export interface CartModel extends BaseModel, TimeTrace {
  user: string;
}
