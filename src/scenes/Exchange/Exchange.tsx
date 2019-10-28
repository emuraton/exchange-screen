import React, { useReducer, useEffect } from 'react';

import PocketList from '../../components/PocketList/PocketList';
import {
  Container,
  Header,
  PocketListsContainer,
  ExchangeButton,
  CancelButton,
  HeaderTitle
} from './Exchange.styles';

export const parseWith2Decimals = (value: any) => {
  const strParsed = Number.parseFloat(value).toFixed(2);
  return parseFloat(strParsed);
};

//TODO can refactor with redux
const initialState = {
  pockets: {
    EUR: { currency: '€', amount: 50.33, currencyLabel: 'EUR' },
    USD: { currency: '$', amount: 25.51, currencyLabel: 'USD' },
    GBP: { currency: '£', amount: 10, currencyLabel: 'GBP' }
  },
  activeInputAmount: '',
  balanceInputAmount: '',
  navigation: {
    activeSelectedPocket: 'EUR',
    balanceSelectedPocket: 'GBP'
  },
  rates: []
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updatePocketAmount':
      // TODO should be immutable, but did a quick code
      const { currency, amount } = action;
      state.pockets[currency].amount = amount;
      return { ...state };

    case 'updateActiveInputAmount':
      const { activeAmount } = action;
      return { ...state, activeInputAmount: activeAmount };

    case 'updateBalanceInputAmount':
      const { balanceAmout } = action;
      return { ...state, balanceInputAmount: balanceAmout };

    case 'updateNavigation':
      const { pocketType, slideIndex } = action;

      if (pocketType === 'activeSelectedPocket') {
        state.navigation[pocketType] = Object.keys(state.pockets)[slideIndex];
      } else {
        state.navigation[pocketType] = Object.keys(state.pockets).reverse()[
          slideIndex
        ];
      }
      return { ...state };

    case 'updateRates':
      const { rates } = action;
      return { ...state, rates };
    default:
      return state;
  }
};

type IProps = {
  fetchRates: Function;
};

const Exchange = ({ fetchRates }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    pockets,
    activeInputAmount,
    balanceInputAmount,
    navigation,
    rates
  } = state;

  useEffect(() => {
    fetchRates(navigation).then((data: any) => {
      dispatch({ type: 'updateRates', rates: data.rates });
    });
  }, [navigation.activeSelectedPocket]);

  const activePocketAmount = pockets[navigation.activeSelectedPocket].amount;
  const balancePocketAmount = pockets[navigation.balanceSelectedPocket].amount;

  const inputActiveHandleChange = (value: any) => {
    const ONLY_DIGITS_REGEX = /^\d*(\.\d{0,2})?$/;
    if (ONLY_DIGITS_REGEX.test(value)) {
      dispatch({ type: 'updateActiveInputAmount', activeAmount: value });

      const rate = rates[navigation.balanceSelectedPocket];
      const convertedValue = value * rate;
      const formatedConvertedValue = parseWith2Decimals(convertedValue);
      dispatch({
        type: 'updateBalanceInputAmount',
        balanceAmout: formatedConvertedValue
      });
    }
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO if activeInputAmount > activePocketAmount display an error message
    // TODO block user is transfering to same pocket

    const newActivePocketAmount = parseWith2Decimals(
      activePocketAmount - activeInputAmount
    );
    dispatch({
      type: 'updatePocketAmount',
      amount: newActivePocketAmount,
      currency: navigation.activeSelectedPocket
    });

    const newBalancePocketAmount = parseWith2Decimals(
      balancePocketAmount + balanceInputAmount
    );
    dispatch({
      type: 'updatePocketAmount',
      amount: newBalancePocketAmount,
      currency: navigation.balanceSelectedPocket
    });

    clearInputValues();
  };

  const updateNavigationDispatch = (slideIndex: number, pocketType: string) => {
    dispatch({
      type: 'updateNavigation',
      slideIndex,
      pocketType
    });
  };

  const clearInputValues = () => {
    dispatch({
      type: 'updateActiveInputAmount',
      activeAmount: ''
    });

    dispatch({
      type: 'updateBalanceInputAmount',
      balanceAmout: ''
    });
  };

  return (
    <Container>
      <section>
        <form>
          <Header>
            <CancelButton disabled>Cancel</CancelButton>
            <HeaderTitle>
              {pockets[navigation.activeSelectedPocket].currency}1 ={' '}
              {pockets[navigation.balanceSelectedPocket].currency}
              {rates[navigation.balanceSelectedPocket]}
            </HeaderTitle>
            <ExchangeButton type="submit" onClick={onSubmit}>
              Exchange
            </ExchangeButton>
          </Header>
          <PocketListsContainer>
            <PocketList
              pockets={pockets}
              inputActiveHandleChange={inputActiveHandleChange}
              updateNavigationDispatch={updateNavigationDispatch}
              pocketType="active"
              inputValue={activeInputAmount}
              clearInputValues={clearInputValues}
            />
            <PocketList
              pockets={pockets}
              updateNavigationDispatch={updateNavigationDispatch}
              pocketType="balance"
              inputValue={balanceInputAmount}
              clearInputValues={clearInputValues}
            />
          </PocketListsContainer>
        </form>
      </section>
    </Container>
  );
};

export default Exchange;
