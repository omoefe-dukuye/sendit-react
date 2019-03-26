import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../header';
import Home from '../home';
import Footer from '../footer';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
        <Switch>
          <Route path={"/"} component={Home} />
        </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
