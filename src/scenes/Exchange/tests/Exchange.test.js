import React from 'react';
import { mount } from 'enzyme';

import Exchange, { parseWith2Decimals, reducer } from '../Exchange';

describe('< Exchange />', () => {
  jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  const fetchRates = jest.fn().mockImplementation(() =>
    Promise.resolve({
      rates: {
        GBP: 1.1107
      }
    })
  );
  test('should render correctly header title', () => {
    const wrapper = mount(<Exchange fetchRates={fetchRates} />);
    const HeaderTitle = wrapper.find('HeaderTitle');
    expect(HeaderTitle.text()).toBe('€1 = £');
  });
});

describe('parseWith2Decimals', () => {
  test('should return a float with 2 decimals', () => {
    const value = parseWith2Decimals('12.333');
    expect(value).toBe(12.33);
  });

  test('should return an integer', () => {
    const value = parseWith2Decimals('123');
    expect(value).toBe(123);
  });

  test('should return a float with one decimal', () => {
    const value = parseWith2Decimals('12.3');
    expect(value).toBe(12.3);
  });
});

describe('reducers', () => {
  const state = {
    pockets: {
      USD: { amount: 20 },
      GBP: { amount: 10 }
    },
    activeInputAmount: '',
    navigation: {
        activeSelectedPocket: '',
        balanceSelectedPocket: ''
    }
  };

  test('updatePocketAmount', () => {
    const action = { currency: 'USD', amount: 12, type: 'updatePocketAmount' };
    const newState = reducer(state, action);
    expect(newState.pockets.USD.amount).toBe(12);
  });

  test('updateActiveInputAmount', () => {
    const action = { activeAmount: 12.33, type: 'updateActiveInputAmount' };
    const newState = reducer(state, action);
    expect(newState.activeInputAmount).toBe(12.33);
  });

  test('updateBalanceInputAmount', () => {
    const action = { balanceAmout: 12.33, type: 'updateBalanceInputAmount' };
    const newState = reducer(state, action);
    expect(newState.balanceInputAmount).toBe(12.33);
  });

  test('updateNavigation with active Pocket', () => {
    const action = { pocketType: 'activeSelectedPocket', slideIndex: 0, type: 'updateNavigation' };
    const newState = reducer(state, action);
    expect(newState.navigation.activeSelectedPocket).toBe('USD');
  });

  test('updateNavigation with balance Pocket', () => {
    const action = { pocketType: 'balanceSelectedPocket', slideIndex: 0, type: 'updateNavigation' };
    const newState = reducer(state, action);
    expect(newState.navigation.balanceSelectedPocket).toBe('GBP');
  });
});
