import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../header';
import Home from '../home';
import Footer from '../footer';
import Login from '../login';
import Signup from '../signup';
import Dashboard from '../dashboard';
import AdminDashboard from '../adminDashboard';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
        <Switch>
          <Route path={'/'} component={Home} exact />
          <Route path={'/login'} component={Login} />
          <Route path={'/signup'} component={Signup} />
          <Route path={'/dashboard'} component={Dashboard} />
          <Route path={'/admin-dashboard'} component={AdminDashboard} />
        </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
