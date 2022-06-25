import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from 'components/layout';
import Landing from 'components/pages/Landing';
import SecondLevelPage from 'components/pages/SecondLevel';
import ProductsPage from 'components/pages/Products';
import ProductDetailsPage from 'components/pages/ProductDetails';
import CartPage from 'components/pages/Cart';
import Checkout from 'components/pages/Checkout';

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/category/:id/products" component={ProductsPage} />
          <Route path="/category/:id" component={SecondLevelPage} />
          <Route path="/product/:id" component={ProductDetailsPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
