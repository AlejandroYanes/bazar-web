import { AxiosPromise } from 'axios';
import { ConsumerModel, ProfileStats, PublisherModel } from 'models/user';
import { get, PagedResponse } from './base';

const usersApi = {
  findMyStats: (): AxiosPromise<ProfileStats> => {
    return get('users/stats');
  },
  listMyFriends: (): AxiosPromise<PagedResponse<ConsumerModel>> => {
    return get('users/friends');
  },
  listMyPending: (): AxiosPromise<PagedResponse<ConsumerModel>> => {
    return get('users/pending');
  },
  listMyPublishers: (): AxiosPromise<PagedResponse<PublisherModel>> => {
    return get('users/publishers');
  },
  listMyFollowers: (): AxiosPromise<PagedResponse<ConsumerModel>> => {
    return get('users/followers');
  },
  findPublisher: (id: string): AxiosPromise<PublisherModel> => {
    return get(`users/publisher/${id}`);
  },
  findConsumer: (id: string): AxiosPromise<ConsumerModel> => {
    return get(`users/consumer/${id}`);
  },
  listPublishersOf: (consumer: string)
    : AxiosPromise<PagedResponse<PublisherModel>> => {
    return get(`users/${consumer}/publishers`);
  },
  listFollowersOf: (publisher: string)
    : AxiosPromise<PagedResponse<ConsumerModel>> => {
    return get(`users/${publisher}/followers`);
  },
  listFriendsOf: (consumer: string)
    : AxiosPromise<PagedResponse<ConsumerModel>> => {
    return get(`users/${consumer}/friends`);
  },
  searchPublishers: (search: string): AxiosPromise<PublisherModel[]> => {
    return get(`users/search/publishers/${search}`);
  },
  searchConsumers: (search: string): AxiosPromise<ConsumerModel[]> => {
    return get(`users/search/consumers/${search}`);
  },
  sendFriendRequest: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/send`);
  },
  acceptFriendRequest: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/accept`);
  },
  declineFriendRequest: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/decline`);
  },
  muteFriend: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/mute`);
  },
  unmuteFriend: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/unmute`);
  },
  blockFriend: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/block`);
  },
  unblockFriend: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/unblock`);
  },
  unfriend: (friend: string): AxiosPromise => {
    return get(`users/friend/${friend}/remove`);
  },
  mutePublisher: (publisher: string): AxiosPromise => {
    return get(`users/publisher/${publisher}/mute`);
  },
  unmutePublisher: (publisher: string): AxiosPromise => {
    return get(`users/publisher/${publisher}/unmute`);
  },
  blockPublisher: (publisher: string): AxiosPromise => {
    return get(`users/publisher/${publisher}/block`);
  },
  unblockPublisher: (publisher: string): AxiosPromise => {
    return get(`users/publisher/${publisher}/unblock`);
  },
  follow: (publisher: string): AxiosPromise => {
    return get(`users/publisher/${publisher}/follow`);
  },
  unfollow: (publisher: string): AxiosPromise => {
    return get(`users/publisher/${publisher}/remove`);
  },
};

export default usersApi;
