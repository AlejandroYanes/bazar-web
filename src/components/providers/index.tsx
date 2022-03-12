import React, { FunctionComponent } from 'react';
import ThemeProvider from './Theme';
import AuthProvider from './Auth';
import QueryProvider from './Query';

const AppProviders: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppProviders;
