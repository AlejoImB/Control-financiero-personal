import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { Card } from '../UI/Card';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

const SummaryCard = styled(Card)`
  text-align: center;
  background-color: ${props => props.bgColor || 'white'};
  color: ${props => props.textColor || 'black'};
`;

export const Summary = () => {
  const { transactions, loading } = useTransactions();

  const calculateSummary = () => {
    return transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === 'income') {
        acc.income += amount;
        acc.balance += amount;
      } else {
        acc.expenses += amount;
        acc.balance -= amount;
      }
      return acc;
    }, { income: 0, expenses: 0, balance: 0 });
  };

  if (loading) return <div>Cargando...</div>;

  const summary = calculateSummary();

  return (
    <SummaryContainer>
      <SummaryCard bgColor="#4CAF50" textColor="white">
        <h3>Income</h3>
        <h2>${summary.income.toFixed(2)}</h2>
      </SummaryCard>
      <SummaryCard bgColor="#f44336" textColor="white">
        <h3>Expenses</h3>
        <h2>${summary.expenses.toFixed(2)}</h2>
      </SummaryCard>
      <SummaryCard bgColor="#2196F3" textColor="white">
        <h3>Balance</h3>
        <h2>${summary.balance.toFixed(2)}</h2>
      </SummaryCard>
    </SummaryContainer>
  );
};
