import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  max-width: 700px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const PocketListsContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

export const ExchangeButton = styled.button`
  display: inline-block;
  border: medium none;
  border-radius: 2em;
  line-height: 1.5em;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  margin-bottom: 0.5em;
  background-color: rgb(235, 0, 141);
  padding: 0.625em 1.5em;

  &:hover {
    background-color: rgb(210, 0, 126);
  }
`;

export const CancelButton = styled.button`
  display: inline-block;
  border: medium none;
  border-radius: 2em;
  line-height: 1.5em;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  margin-bottom: 0.5em;
  background-color: rgb(0, 117, 235, 0.7);
  padding: 0.625em 1.5em;

  &:hover {
    background-color: rgb(0, 117, 235, 1.1);
  }
`;

const HeaderTitle = styled.span`
  font-weight: 400;
  font-size: 2rem;
`;

HeaderTitle.displayName = 'HeaderTitle';
export { HeaderTitle };
