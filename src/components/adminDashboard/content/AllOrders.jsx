import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AllParcels from './allParcels';
import axios from '../../../utils/axiosConfig';
import Loader from '../../loader';

export default class AllOrders extends Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    try {
      const { data: { orders: parcels } } = await axios.get(`${process.env.API_ROOT_URL}/parcels`);
      this.setState({ parcels });
    } catch ({ response: { data: { error } } }) {
      toast.error(error);
    }
    this.setState({ loading: false });
  }

  render() {
    const { parcels, loading } = this.state;

    return (
      <div>
        {
          loading
            ? <Loader />
            : <AllParcels parcels={parcels} />
        }
      </div>
    )
  }
}
