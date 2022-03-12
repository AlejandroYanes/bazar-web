import { AxiosResponse } from 'axios';
import { UpdateModel } from 'models/update';
import { get, PagedResponse } from './base';

const updatesApi = {
  listMyUpdates: (): Promise<AxiosResponse<PagedResponse<UpdateModel>>> => {
    return get('activities');
  },
};

export default updatesApi;
