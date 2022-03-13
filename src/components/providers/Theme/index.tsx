import React, { FunctionComponent } from 'react';
import { Configuration } from 'activate-components';
import { LifeIsABeachTheme, } from 'styles/themes';
import { PrimaryGlobalStyles } from './GlobalStyles';


const palette = {
  ...LifeIsABeachTheme,
  BACKGROUND: '#ffffff',
};

const ThemeProvider: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <Configuration palette={palette}>
      <PrimaryGlobalStyles />
      {children}
    </Configuration>
  );
};

export default ThemeProvider;
