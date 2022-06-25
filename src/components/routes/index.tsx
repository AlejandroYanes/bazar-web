import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from 'components/layout';
import Landing from 'components/pages/Landing';
import SecondLevelPage from 'components/pages/SecondLevel';
import ProductsPage from 'components/pages/Products';
import ProductDetailsPage from 'components/pages/ProductDetails';
import CartPage from 'components/pages/Cart';
import Checkout from 'components/pages/Checkout';
import Login from 'components/pages/Login';
import Signup from 'components/pages/Signup';

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
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
