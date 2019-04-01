import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';
import axios from '../../../utils/axiosConfig';
import parcels from '../../mocks/mockParcels';
import AllOrders from '../../../components/adminDashboard/content/AllOrders';

jest.mock('../../../utils/axiosConfig');

test('Should render static component', async () => {
  axios.get.mockResolvedValue({ data: { orders: parcels } });
  const wrapper = await shallow(<AllOrders />);
  expect(wrapper).toMatchSnapshot();
});

test('Should handle server errors', async () => {
  axios.get.mockRejectedValue({ response: { data: { error: 'error' } } });
  const wrapper = await shallow(<AllOrders />);
  expect(wrapper).toMatchSnapshot();
});
