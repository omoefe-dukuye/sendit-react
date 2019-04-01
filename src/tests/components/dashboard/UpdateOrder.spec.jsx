import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';
import axios from '../../../utils/axiosConfig';
import parcels from '../../mocks/mockParcels';
import UpdateOrder from '../../../components/adminDashboard/content/UpdateOrder';

jest.mock('../../../utils/axiosConfig');

const tick = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  })
};

test('Should render static component', async () => {
  const wrapper = shallow(<UpdateOrder />);
  expect(wrapper).toMatchSnapshot();
});

test('Should handle parcelId input interactions', async () => {
  const wrapper = shallow(<UpdateOrder />);
  wrapper.find('input').at(1).simulate('change', { target: { value: 3 } });
  expect(wrapper.state('parcelId')).toBe(3);

  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('parcelIdErrorMessage')).toBe('');

  wrapper.find('input').at(1).simulate('change', { target: { value: 'p' } });
  expect(wrapper.state('parcelId')).toBe('p');

  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('parcelIdErrorMessage')).toBe('must be a number.');
});

test('Should handle location input interactions', async () => {
  const wrapper = shallow(<UpdateOrder />);
  wrapper.find('input').at(0).simulate('blur');
  expect(wrapper.state('locationErrorMessage')).toBe('cannot be empty.');

  wrapper.find('input').at(0).simulate('change', { target: { value: 'lokoja' } });
  expect(wrapper.state('location')).toBe('lokoja');

  wrapper.find('input').at(0).simulate('blur');
  expect(wrapper.state('location')).toBe('lokoja');
});

test('Should handle submit interactions', async () => {
  axios.patch.mockRejectedValue({ response: { data: { error: 'error' } } });
  const wrapper = shallow(<UpdateOrder />);
  wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
  expect(wrapper.state('locationErrorMessage')).toBe('cannot be empty.');

  wrapper.find('input').at(0).simulate('change', { target: { value: 'lokoja' } });
  expect(wrapper.state('location')).toBe('lokoja');
  wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
  expect(wrapper.state('parcelIdErrorMessage')).toBe('must be a number.');

  wrapper.find('input').at(1).simulate('change', { target: { value: 3 } });
  wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
  expect(wrapper.state('parcelId')).toBe(3);

  axios.patch.mockResolvedValue({ data: parcels[0] });
  wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
  await tick();
  expect(wrapper.state('newParcel')).toEqual(parcels[0]);

});
