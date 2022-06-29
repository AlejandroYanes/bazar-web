export enum EventChannelList {
  SESSION_CREATED = 'SESSION_CREATED',
}

export type EventChannel = keyof (typeof EventChannelList);
