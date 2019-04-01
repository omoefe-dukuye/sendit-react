import React from 'react';
import { shallow } from 'enzyme';
import uuid from 'uuid/v1';
import '@babel/polyfill';
import AllParcels from '../../../components/adminDashboard/content/allParcels';
import parcels from '../../mocks/mockParcels';

jest.mock('uuid/v1');

test('Should render static component', () => {
  uuid.mockReturnValue('uuid');
  const wrapper = shallow(<AllParcels parcels={parcels} />);
  expect(wrapper).toMatchSnapshot();
});
