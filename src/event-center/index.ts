import { useEffect } from 'react';
import { Subject } from 'rxjs';
import { EventChannelList, EventChannel } from './channels';

export type { EventChannel };
export { EventChannelList };

const eventCenter = {};

export function listenToEventChannel(channel: EventChannel, observer) {
  if (!eventCenter[channel]) {
    eventCenter[channel] = new Subject();
  }

  return eventCenter[channel].subscribe(observer);
}

export function notifyEventChannel(channel: EventChannel, payload?) {
  if (eventCenter[channel]) {
    eventCenter[channel].next(payload);
  }
}

export function useEventCenterUpdates(channelList: EventChannel[], observer) {
  useEffect(() => {
    const subscriptions = channelList.map(
      (channel) => listenToEventChannel(channel, observer)
    );

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [observer, channelList]);
}

export function useEventCenterUpdate(channel: EventChannel, observer) {
  useEffect(() => {
    const subscription = listenToEventChannel(channel, observer);

    return () => {
      subscription.unsubscribe();
    };
  }, [observer, channel]);
}
