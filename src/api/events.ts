import { AxiosPromise } from 'axios';
import { EventModel } from 'models/event';
import { get, PagedResponse } from './base';

const eventsApi = {
  getDetails: (eventId: string): AxiosPromise<EventModel> => {
    return get(`events/${eventId}/details`);
  },
  listTopEvents: () : AxiosPromise<EventModel[]> => {
    return get('events/top');
  },
  listMyUpcomingDates: (): AxiosPromise<PagedResponse<Date>> => {
    return get('events/upcoming/dates');
  },
  listMyUpcoming: (date?: Date): AxiosPromise<PagedResponse<EventModel>> => {
    return get('events/upcoming', {
      params: {
        filters: {
          date: date ? date.toISOString() : undefined,
        },
      },
    });
  },
  listPublishedBy: (publisher: string): AxiosPromise<EventModel[]> => {
    return get(`events/publishedBy/${publisher}`);
  },
  listAttendedBy: (consumer: string): AxiosPromise<EventModel[]> => {
    return get(`events/attended-by/${consumer}`);
  },
  discover: (date?: Date): AxiosPromise<EventModel[]> => {
    return get('events/discover', {
      params: {
        filters: {
          date: date?.toISOString(),
        },
      },
    });
  },
  search: (search: string): AxiosPromise<EventModel[]> => {
    return get(`events/search/${search}`);
  },
  follow: (event: string): AxiosPromise => {
    return get(`events/${event}/follow`);
  },
  unfollow: (event: string): AxiosPromise => {
    return get(`events/${event}/unfollow`);
  }
};

export default eventsApi;
