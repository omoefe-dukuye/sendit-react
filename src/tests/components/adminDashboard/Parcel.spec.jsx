import React from 'react';
import { shallow } from 'enzyme';
import uuid from 'uuid/v1';
import '@babel/polyfill';
import Parcel from '../../../components/adminDashboard/content/allParcels/Parcel';
import parcels from '../../mocks/mockParcels';

jest.mock('uuid/v1');

test('Should render static component', () => {
  uuid.mockReturnValue('uuid');
  const wrapper = shallow(<Parcel parcel={parcels[0]} />);
  expect(wrapper).toMatchSnapshot();
});
