import { AxiosResponse } from 'axios';
import { get, post } from './base';
import { CategoryModel } from '../models/category';

const endpoint = 'interests';

const interestsApi = {
  update: (interests: string[]): Promise<AxiosResponse> => {
    return post(endpoint, { categoryIds: interests });
  },
  listMyInterests: (): Promise<AxiosResponse<CategoryModel[]>> => {
    return get(endpoint);
  },
};

export default interestsApi;
