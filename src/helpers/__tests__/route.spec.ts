/* eslint-disable max-len */
import { parseSearchQuery } from '../route';

describe('parseSearchQuery helper function', () => {

  it('should return an object with the keys and values of the query', () => {
    const query = '?term=test&date=2021-08-27';
    const { term, date } = parseSearchQuery<{ term: string; date: string }>(query);
    expect(term).toBe('test');
    expect(date).toBe('2021-08-27');
  });

  it('should return an empty object if the query does not follow the correct format', () => {
    const query = 'term=test&date=2021-08-27';
    const { term, date } = parseSearchQuery<{ term: string; date: string }>(query);

    expect(term).toBe(undefined);
    expect(date).toBe(undefined);
  });
});
