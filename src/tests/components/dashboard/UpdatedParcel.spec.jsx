import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';
import UpdatedParcel from '../../../components/adminDashboard/content/updatedParcel';

test('Should render static component', () => {
  const wrapper = shallow(<UpdatedParcel parcel={{
    "status": 200,
    "id": "35",
    "message": "parcel destination updated",
    "newDestination": "Ikeja, Nigeria",
    "newDistance": "4 km",
    "additionalPrice": "N 600"
}} />);
  expect(wrapper).toMatchSnapshot();
});
