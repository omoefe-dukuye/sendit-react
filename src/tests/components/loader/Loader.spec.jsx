import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../../components/loader';

test('Should render static component', () => {
  const wrapper = shallow(<Loader />);
  expect(wrapper).toMatchSnapshot();
});
