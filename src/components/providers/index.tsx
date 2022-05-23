import React, { FunctionComponent } from 'react';
import ThemeProvider from './Theme';
import QueryProvider from './Query';
import AuthProvider from './Auth';
import CartProvider from './Cart';

const AppProviders: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
