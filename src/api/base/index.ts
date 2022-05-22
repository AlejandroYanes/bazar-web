import { Appwrite } from 'appwrite';

const { REACT_APP_PROJECT_ID, REACT_APP_API_ENDPOINT } = process.env;

let api: Appwrite;

export function getAppWrite() {
  if (api) {
    return api;
  }
  api = new Appwrite()
    .setEndpoint(REACT_APP_API_ENDPOINT)
    .setProject(REACT_APP_PROJECT_ID);

  return api;
}
