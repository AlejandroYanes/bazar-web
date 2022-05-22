import { BaseModel } from './app-write';

export interface SubCategoryModel extends BaseModel {
  name: string;
  category: string;
}
