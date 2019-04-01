import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';
import axios from '../../../utils/axiosConfig';
import parcels from '../../mocks/mockParcels';
import UserOrders from '../../../components/adminDashboard/content/UserOrders';

jest.mock('../../../utils/axiosConfig');

const tick = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  })
};

test('Should render static component', async () => {
  const wrapper = await shallow(<UserOrders />);
  expect(wrapper).toMatchSnapshot();
});

test('Should handle input interactions', async () => {
  const wrapper = await shallow(<UserOrders />);
  wrapper.find('input').simulate('change', { target: { value: 3 } });
  expect(wrapper.state('userId')).toBe(3);

  wrapper.find('input').simulate('blur');
  expect(wrapper.state('userIdErrorMessage')).toBe('');

  wrapper.find('input').simulate('change', { target: { value: 'p' } });
  expect(wrapper.state('userId')).toBe('p');

  wrapper.find('input').simulate('blur');
  expect(wrapper.state('userIdErrorMessage')).toBe('must be a number.');
});

test('Should handle submit interactions', async () => {
  axios.get.mockRejectedValue({ response: { data: { error: 'error' } } });
  const wrapper = await shallow(<UserOrders />);
  wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
  expect(wrapper.state('userIdErrorMessage')).toBe('must be a number.');
  
  wrapper.find('input').simulate('change', { target: { value: 2 } });
  expect(wrapper.state('userId')).toBe(2);
  
  wrapper.find('button').simulate('click', { preventDefault: jest.fn() });

  axios.get.mockResolvedValue({ data: { orders: parcels } });
  wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
  await tick();
  expect(wrapper.state('parcels')).toEqual(parcels);

});



