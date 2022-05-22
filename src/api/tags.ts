import { getAppWrite } from './base';

const { REACT_APP_TAGS_COLLECTION } = process.env;

const tagsApi = {
  list: () => {
    return getAppWrite().database.listDocuments(REACT_APP_TAGS_COLLECTION);
  },
};

export default tagsApi;
