import React, { FunctionComponent, useEffect } from 'react';
import AppProviders from 'components/providers';
import Routes from 'components/routes';

const App: FunctionComponent = () => {
  useEffect(() => {
    const preloader = document.querySelector('[data-el="preloader"]');
    (preloader as HTMLElement).style.display = 'none';
  }, []);

  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  );
};

export default App;
