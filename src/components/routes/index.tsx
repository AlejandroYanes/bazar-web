import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductsPage from 'components/pages/Products';


const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ProductsPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
