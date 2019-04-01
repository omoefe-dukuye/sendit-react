import React from 'react';
import '@babel/polyfill';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../components/adminDashboard/Dashboard';

test('should render static component', () => {
  const wrapper = shallow(<Dashboard />);
  wrapper.setProps({ user: { isAdmin: true }, history: { push: jest.fn() }});
  expect(wrapper).toMatchSnapshot();
});

test('should redirect if no user', () => {
  const push = jest.fn();
  const wrapper = shallow(<Dashboard />);
  wrapper.setProps({ user: undefined, history: { push }});
  expect(push).toHaveBeenCalledWith('/login');
});

test('should redirect if not admin', () => {
  const push = jest.fn();
  const wrapper = shallow(<Dashboard />);
  wrapper.setProps({ user: { isAdmin: false }, history: { push }});
  expect(push).toHaveBeenCalledWith('/dashboard');
});
