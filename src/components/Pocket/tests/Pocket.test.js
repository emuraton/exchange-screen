import React from 'react';
import { shallow } from 'enzyme';

import Pocket from '../Pocket';

describe('<Pocket />', () => {
  const initialProps = {
    currency: 'EUR',
    currencyLabel: '£',
    pocketAmount: 55.22,
    inputValue: ''
  };

  it('should render correctly', () => {
    const wrapper = shallow(<Pocket {...initialProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the right currency label', () => {
    const wrapper = shallow(<Pocket {...initialProps} />);
    const CurrencyLabel = wrapper.find('CurrencyLabel');
    expect(CurrencyLabel.text()).toBe(initialProps.currencyLabel);
  });

  it('should have the right pocket amount', () => {
    const wrapper = shallow(<Pocket {...initialProps} />);
    const CurrencyLabel = wrapper.find('AmountLabel');
    expect(CurrencyLabel.contains(initialProps.pocketAmount)).toBe(true);
  });
});
