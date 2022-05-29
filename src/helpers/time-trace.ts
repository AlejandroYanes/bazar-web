import { TimeTrace } from 'models/app-write';

export function addTimeStamp<T>(
  item: T & TimeTrace,
): T & TimeTrace {
  const now = new Date();

  if (item.createdAt) {
    return { ...item, modifiedAt: now.toUTCString() }
  }

  return { ...item, createdAt: now.toUTCString(), modifiedAt: now.toUTCString() }
}
