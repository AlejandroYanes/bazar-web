import React, { FunctionComponent } from 'react';
import ThemeProvider from './Theme';
import QueryProvider from './Query';

const AppProviders: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
