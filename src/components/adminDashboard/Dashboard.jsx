import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';
import AllOrders from './content/AllOrders';
import StatusChange from './content/StatusChange';
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
        <Route path='/admin-dashboard/status' component={StatusChange} />
        <Route path='/admin-dashboard/location' component={UpdateOrder} />
        <Route path='/admin-dashboard/details' component={CancelOrder} />
        <Route path='/admin-dashboard/user' component={OrderDetails} />
        <Route path='/admin-dashboard/all' component={AllOrders} />
        <Redirect to='/admin-dashboard/status' />
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
