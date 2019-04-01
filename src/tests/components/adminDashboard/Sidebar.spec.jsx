import React from 'react';
import '@babel/polyfill';
import { shallow } from 'enzyme';
import Sidebar from '../../../components/adminDashboard/sidebar';

test('should render static component', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper).toMatchSnapshot();
});