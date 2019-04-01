import React from 'react';
import { shallow } from 'enzyme';
import Map from '../../../components/map';

test('Should render static component', () => {
  const wrapper = shallow(<Map />);
  expect(wrapper).toMatchSnapshot();
});
