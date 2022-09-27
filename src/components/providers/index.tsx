import React, { FunctionComponent } from 'react';
import ThemeProvider from './Theme';
import QueryProvider from './Query';
import AuthProvider from './Auth';

const AppProviders: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
