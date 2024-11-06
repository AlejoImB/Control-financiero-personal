import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { Button } from '../UI/Button';
import { TextField, Select, MenuItem, Dialog } from '@mui/material';
import styled from 'styled-components';

const TransactionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  margin: 0.5rem 0;
  border-radius: 4px;
`;

export const TransactionManager = () => {
  const {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction
  } = useTransactions();

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'others'
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Manejar la creación de una nueva transacción
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      console.log('Creando nueva transacción:', formData);
      await addTransaction(formData);
      setFormData({ description: '', amount: '', type: 'expense', category: 'others' });
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error al crear transacción:', err);
    }
  };

  // Manejar la actualización de una transacción
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log('Actualizando transacción con ID:', editingId, 'con datos:', formData);
      await updateTransaction(editingId, formData);
      setFormData({ description: '', amount: '', type: 'expense', category: 'others' });
      setEditingId(null);
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error al actualizar transacción:', err);
    }
  };

  // Manejar la eliminación de una transacción
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de querer eliminar esta transacción?')) {
      try {
        console.log('Eliminando transacción con ID:', id);
        await deleteTransaction(id);
      } catch (err) {
        console.error('Error al eliminar transacción:', err);
      }
    }
  };

  // Abrir el diálogo para editar
  const handleEdit = (transaction) => {
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category || 'others'
    });
    setEditingId(transaction.id);
    setIsDialogOpen(true);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)}>
        Nueva Transacción
      </Button>

      {/* Lista de transacciones */}
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id}>
          <div>
            <h3>{transaction.description}</h3>
            <p>
              {transaction.type === 'expense' ? '-' : '+'} 
              ${transaction.amount}
            </p>
            <small>{transaction.category}</small>
          </div>
          <div>
            <Button onClick={() => handleEdit(transaction)}>Editar</Button>
            <Button onClick={() => handleDelete(transaction.id)}>Eliminar</Button>
          </div>
        </TransactionItem>
      ))}

      {/* Diálogo de formulario */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <TransactionForm onSubmit={editingId ? handleUpdate : handleCreate}>
          <TextField
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            label="Monto"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <Select
            label="Tipo"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="income">Ingreso</MenuItem>
            <MenuItem value="expense">Gasto</MenuItem>
          </Select>
          <TextField
            label="Categoría"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <Button type="submit">{editingId ? 'Actualizar' : 'Crear'}</Button>
        </TransactionForm>
      </Dialog>
    </div>
  );
};