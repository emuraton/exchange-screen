import React from 'react';
import { shallow } from 'enzyme';

import PocketList from '../PocketList';

describe('<PocketList />', () => {
  const initialProps = {
    pockets: {
      EUR: { currency: '€', amount: 50.33, currencyLabel: 'EUR' },
      GBP: { currency: '£', amount: 10, currencyLabel: 'GBP' }
    },
    inputActiveHandleChange: jest.fn(),
    updateNavigationDispatch: jest.fn(),
    pocketType: 'active',
    inputValue: '',
    clearInputValues: jest.fn()
  };

  test('should not crash', () => {
    const wrapper = shallow(<PocketList {...initialProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should have 2  ACTIVE pockets in the right order', () => {
    const wrapper = shallow(<PocketList {...initialProps} />);
    const FirstPocket = wrapper.find('Pocket').first();
    expect(FirstPocket.prop('currencyLabel')).toBe('EUR');

    const SecondPocket = wrapper.find('Pocket').at(1);
    expect(SecondPocket.prop('currencyLabel')).toBe('GBP');
  });
});
