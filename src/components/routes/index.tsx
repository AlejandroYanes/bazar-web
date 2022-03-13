import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from 'components/layout';
import Landing from 'components/pages/Landing';

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Landing} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
