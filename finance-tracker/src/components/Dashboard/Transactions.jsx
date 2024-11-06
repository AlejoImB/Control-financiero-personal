import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import styled from 'styled-components';

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
`;

export const Transactions = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [open, setOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense'
  });

  const handleOpen = (transaction = null) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type
      });
    } else {
      setEditingTransaction(null);
      setFormData({
        description: '',
        amount: '',
        type: 'expense'
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTransaction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, formData);
      } else {
        await addTransaction(formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <Card>
      <h2>Transactions</h2>
      <Button onClick={() => handleOpen()}>Add Transaction</Button>
      
      <TransactionList>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id}>
            <div>
              <h3>{transaction.description}</h3>
              <p>{transaction.type === 'expense' ? '-' : '+'} ${transaction.amount}</p>
            </div>
            <div>
              <Button onClick={() => handleOpen(transaction)}>Edit</Button>
              <Button variant="secondary" onClick={() => handleDelete(transaction.id)}>Delete</Button>
            </div>
          </TransactionItem>
        ))}
      </TransactionList>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <TextField
              label="Amount"
              type="number"
              fullWidth
              margin="normal"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
            <TextField
              select
              label="Type"
              fullWidth
              margin="normal"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              SelectProps={{
                native: true,
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="secondary">Cancel</Button>
          <Button onClick={handleSubmit}>{editingTransaction ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
