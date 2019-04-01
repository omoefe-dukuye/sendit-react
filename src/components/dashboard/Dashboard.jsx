import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';
import AllOrders from './content/AllOrders';
import CreateOrder from './content/CreateOrder';
import UpdateOrder from './content/UpdateOrder';
import CancelOrder from './content/CancelOrder';
import OrderDetails from './content/OrderDetails';
import './styles.scss';

export class Dashboard extends Component {
  componentDidUpdate() {
    const { user, history } = this.props;

    if (!user) {
      return history.push('/login');
    }
  }

  render() {
    return (
      <div className='dashboard'>
        <Sidebar />
        <Switch>
        <Route path='/dashboard/create' component={CreateOrder} />
        <Route path='/dashboard/update' component={UpdateOrder} />
        <Route path='/dashboard/cancel' component={CancelOrder} />
        <Route path='/dashboard/details' component={OrderDetails} />
        <Route path='/dashboard/all' component={AllOrders} />
        <Redirect to='/dashboard/all' />
        </Switch>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object
}

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
