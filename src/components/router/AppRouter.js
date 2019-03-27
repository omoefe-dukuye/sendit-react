import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../header';
import Home from '../home';
import Footer from '../footer';
import Login from '../login';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
        <Switch>
          <Route path={"/"} component={Home} exact />
          <Route path={"/login"} component={Login} />
        </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
