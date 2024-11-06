import React from 'react';
import { Summary } from '../components/Dashboard/Summary';
import { Transactions } from '../components/Dashboard/Transactions';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Home = () => {
  return (
    <HomeContainer>
      <h1>Dashboard</h1>
      <Summary />
      <Transactions />
    </HomeContainer>
  );
};
