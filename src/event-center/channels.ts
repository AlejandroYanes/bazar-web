export enum EventChannelList {
  USER_INFO_CHANGED = 'USER_INFO_CHANGED',
}

export type EventChannel = keyof (typeof EventChannelList);
