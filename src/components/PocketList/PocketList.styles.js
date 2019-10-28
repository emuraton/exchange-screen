import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 30px 0 30px;
  color: white;
  background-color: ${props =>
    props.pocketType === 'active'
      ? 'rgb(0, 117, 235, 0.7)'
      : 'rgb(0, 117, 235, 1.1)'};
`;
