import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';
import ParcelInfo from '../../../components/adminDashboard/content/parcelInfo';
import parcels from '../../mocks/mockParcels';

test('Should render static component', () => {
  const wrapper = shallow(<ParcelInfo parcel={parcels[0]} />);
  expect(wrapper).toMatchSnapshot();
});
