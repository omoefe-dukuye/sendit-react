import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';
import UpdatedParcelLocation from '../../../components/adminDashboard/content/updatedParcelLocation';

test('Should render static component', () => {
  const wrapper = shallow(<UpdatedParcelLocation parcel={{
    "status": 200,
    "id": "30",
    "currentLocation": "Kampala, Uganda",
    "message": "parcel location updated",
    "newDistance": "3058 km"
}} />);
  expect(wrapper).toMatchSnapshot();
});
