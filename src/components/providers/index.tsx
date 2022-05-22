import React, { FunctionComponent } from 'react';
import ThemeProvider from './Theme';
import QueryProvider from './Query';
import CartProvider from './Cart';

const AppProviders: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <ThemeProvider>
      <QueryProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
