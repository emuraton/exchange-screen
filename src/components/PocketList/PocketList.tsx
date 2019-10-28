import React from 'react';
import Carousel from 'nuka-carousel';

import Pocket from '../Pocket/Pocket';

import { Container } from './PocketList.styles';

type IProps = {
  pockets: any;
  inputActiveHandleChange?: Function;
  updateNavigationDispatch: Function;
  pocketType: string;
  inputValue?: string;
  clearInputValues: Function;
};

const PocketList = ({
  pockets,
  inputActiveHandleChange,
  updateNavigationDispatch,
  pocketType,
  inputValue,
  clearInputValues
}: IProps) => {
  const pocketsValues =
    pocketType === 'active'
      ? Object.values(pockets)
      : Object.values(pockets).reverse();

  return (
    <Container pocketType={pocketType}>
      <Carousel
        wrapAround
        afterSlide={slideIndex => {
          updateNavigationDispatch(
            slideIndex,
            pocketType === 'active'
              ? 'activeSelectedPocket'
              : 'balanceSelectedPocket'
          );
          clearInputValues();
        }}
      >
        {pocketsValues.map((pocket: any) => (
          <Pocket
            currency={pocket.currency}
            currencyLabel={pocket.currencyLabel}
            pocketAmount={pocket.amount}
            onChangeHandler={inputActiveHandleChange}
            key={`${
              pocketType === 'active' ? 'Active Pocket' : 'Balance Pocket'
            } - ${pocket.currency}`}
            inputValue={inputValue}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default PocketList;
