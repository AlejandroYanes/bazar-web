import React, { FunctionComponent } from 'react';
import { Configuration, NotificationCenter } from '@devland-ui/components';
import { SummerVibesTheme, } from 'styles/themes';
import { PrimaryGlobalStyles } from './GlobalStyles';


const palette = {
  ...SummerVibesTheme,
  BACKGROUND: '#ffffff',
};

const ThemeProvider: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <Configuration palette={palette}>
      <PrimaryGlobalStyles />
      {children}
      <NotificationCenter />
    </Configuration>
  );
};

export default ThemeProvider;
