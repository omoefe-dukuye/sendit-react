import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/modal';

test('Should render static component', () => {
  const wrapper = shallow(<Modal />);
  expect(wrapper).toMatchSnapshot();
});
