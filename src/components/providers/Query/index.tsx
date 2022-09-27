import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export * from './types';

export const queryClient = new QueryClient();

const QueryProvider: FunctionComponent  = (props) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
