import React, { useEffect, useRef } from 'react';

import {
  Container,
  LeftFlexWrapper,
  RightFlexWrapper,
  CurrencyLabel,
  AmountLabel,
  AmountInput
} from './Pocket.styles.js';

type IProps = {
  currency: string;
  currencyLabel: string;
  pocketAmount: number;
  focusOnPageLoading?: boolean;
  onChangeHandler?: Function;
  inputValue?: string;
  index?: string;
};

const Pocket = ({
  currency,
  currencyLabel,
  pocketAmount,
  focusOnPageLoading,
  onChangeHandler,
  inputValue
}: IProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  // fallback for html5 autofcus
  useEffect(() => {
    if (focusOnPageLoading && inputEl.current) {
      inputEl.current.focus();
    }
  }, [focusOnPageLoading]);

  return (
    <Container>
      <LeftFlexWrapper>
        <CurrencyLabel>{currencyLabel}</CurrencyLabel>
        <AmountLabel>
          You have {currency}
          {pocketAmount}
        </AmountLabel>
      </LeftFlexWrapper>
      <RightFlexWrapper>
        <AmountInput
          type="text"
          autoFocus
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeHandler && onChangeHandler(e.target.value)
          }
          ref={inputEl}
        />
      </RightFlexWrapper>
    </Container>
  );
};

export default Pocket;
