import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 100px;
  height: 200px;
`;

export const LeftFlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const RightFlexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: right;
`;

const CurrencyLabel = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

CurrencyLabel.displayName = 'CurrencyLabel';
export { CurrencyLabel };

const AmountLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 200;
`;
AmountLabel.displayName = 'AmountLabel';
export { AmountLabel };

const AmountInput = styled.input`
  font-size: 1.1rem;
  font-weight: 300;
  height: 30px;
`;

AmountInput.displayName = 'AmountInput';
export { AmountInput };
