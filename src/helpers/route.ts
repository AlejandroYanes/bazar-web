export function parseSearchQuery<T>(query: string): T {
  if (query.charAt(0) !== '?') {
    return {} as any;
  }

  const data: any = {};
  const normalizedQuery = query.trim().slice(1);
  const params = normalizedQuery.split('&');

  params.forEach((param) => {
    const [key, value] = param.split('=');
    data[key] = value;
  });

  return data;
}
