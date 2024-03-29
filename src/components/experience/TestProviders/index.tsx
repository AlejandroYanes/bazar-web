import { TestWrapper } from '@devland-ui/components';
import QueryProvider from 'components/providers/Query';

export default function TestProviders({ component, ...rest }) {
  return (
    <QueryProvider>
      <TestWrapper component={component} {...rest} />
    </QueryProvider>
  );
}
