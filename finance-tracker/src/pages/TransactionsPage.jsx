import React from 'react';
import { Transactions } from '../components/Dashboard/Transactions';
import styled from 'styled-components';

const TransactionsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const TransactionsPage = () => {
  return (
    <TransactionsContainer>
      <h1>Transactions</h1>
      <Transactions />
    </TransactionsContainer>
  );
};
