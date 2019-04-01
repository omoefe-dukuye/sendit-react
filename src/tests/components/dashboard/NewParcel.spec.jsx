import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';
import NewParcel from '../../../components/adminDashboard/content/newParcel';
import parcels from '../../mocks/mockParcels';

test('Should render static component', () => {
  const wrapper = shallow(<NewParcel parcel={parcels[0]} />);
  expect(wrapper).toMatchSnapshot();
});
