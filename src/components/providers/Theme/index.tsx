import React, { FunctionComponent } from 'react';
import { Configuration, Layout, RenderByLayout } from 'activate-components';
import {
  DuskLightsTheme,
  FruitsTheme,
  GrapesTheme,
  LifeIsABeachTheme,
  NeonLightsTheme,
  SummerVibesTheme,
} from 'styles/themes';
import { useAuthData } from 'components/providers/Auth';
import { MobileGlobalStyles, PrimaryGlobalStyles } from './GlobalStyles';

export enum AppTheme {
  Grapes = 'Grapes',
  NeonLights = 'NeonLights',
  SummerVibes = 'SummerVibes',
  LifeIsABeach = 'LifeIsABeach',
  DuskLights = 'DuskLights',
  Fruits = 'Fruits',
}

const themesMap = {
  [AppTheme.Grapes]: GrapesTheme,
  [AppTheme.NeonLights]: NeonLightsTheme,
  [AppTheme.SummerVibes]: SummerVibesTheme,
  [AppTheme.LifeIsABeach]: LifeIsABeachTheme,
  [AppTheme.DuskLights]: DuskLightsTheme,
  [AppTheme.Fruits]: FruitsTheme,
};

const globalStyles = {
  [Layout.DESKTOP]: PrimaryGlobalStyles,
  [Layout.TABLET]: PrimaryGlobalStyles,
  [Layout.MOBILE]: MobileGlobalStyles,
};

const ThemeProvider: FunctionComponent = (props) => {
  const { children } = props;
  const { userInfo } = useAuthData();
  const theme = userInfo?.theme || AppTheme.LifeIsABeach;
  const useDarkStyle = userInfo ? userInfo.useDarkStyle : false;

  const palette = {
    ...themesMap[theme],
    BACKGROUND: useDarkStyle ? '#1c1c1c' : '#ffffff',
  };


  return (
    <Configuration palette={palette}>
      <RenderByLayout
        options={globalStyles}
        fallback={PrimaryGlobalStyles}
      />
      {children}
    </Configuration>
  );
};

export default ThemeProvider;
