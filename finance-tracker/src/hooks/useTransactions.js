import { useState, useEffect, useCallback } from 'react';
import { 
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contexts/AuthContext';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // CREATE - Agregar una nueva transacción
  const addTransaction = async (transactionData) => {
    try {
      const newTransaction = {
        description: transactionData.description,
        amount: parseFloat(transactionData.amount),
        type: transactionData.type,
        userId: user.uid,
        createdAt: Timestamp.fromDate(new Date()),
        category: transactionData.category || 'others',
      };

      console.log('Creando nueva transacción:', newTransaction);
      const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
      console.log('Transacción guardada con ID:', docRef.id);
      setTransactions(prev => [...prev, { id: docRef.id, ...newTransaction }]);
      
      return docRef.id;
    } catch (err) {
      console.error('Error al crear transacción:', err);
      setError(err.message);
      throw err;
    }
  };

  // READ - Obtener todas las transacciones del usuario (en tiempo real)
  const fetchTransactions = useCallback(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        amount: parseFloat(doc.data().amount),
        createdAt: doc.data().createdAt.toDate()
      }));

      setTransactions(transactionsData);
      setLoading(false);
      setError(null);
    }, (error) => {
      console.error('Error al obtener transacciones:', error);
      setError(error.message);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  // UPDATE - Actualizar una transacción existente
  const updateTransaction = async (id, transactionData) => {
    try {
      const transactionRef = doc(db, 'transactions', id);
      const updatedData = {
        description: transactionData.description,
        amount: parseFloat(transactionData.amount),
        type: transactionData.type,
        category: transactionData.category || 'others',
        updatedAt: Timestamp.fromDate(new Date())
      };

      console.log('Actualizando transacción con ID:', id);
      await updateDoc(transactionRef, updatedData);
      setTransactions(prev =>
        prev.map(transaction =>
          transaction.id === id
            ? { ...transaction, ...updatedData }
            : transaction
        )
      );
      
      setError(null);
    } catch (err) {
      console.error('Error al actualizar transacción:', err);
      setError(err.message);
      throw err;
    }
  };

  // DELETE - Eliminar una transacción
  const deleteTransaction = async (id) => {
    try {
      console.log('Eliminando transacción con ID:', id);
      await deleteDoc(doc(db, 'transactions', id));
      setTransactions(prev => prev.filter(transaction => transaction.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error al eliminar transacción:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar transacciones cuando el usuario cambia
  useEffect(() => {
    if (user) {
      const unsubscribe = fetchTransactions();
      return () => unsubscribe && unsubscribe(); // Cancelar suscripción al salir
    } else {
      setTransactions([]);
      setLoading(false);
    }
  }, [user, fetchTransactions]);

  // Funciones de utilidad para filtrar y analizar transacciones
  const getTransactionsByType = (type) => {
    return transactions.filter(t => t.type === type);
  };

  const getTransactionsByDateRange = (startDate, endDate) => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.createdAt);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  };

  const getTotalsByType = () => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else {
          acc.expenses += transaction.amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 }
    );
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
    getTransactionsByType,
    getTransactionsByDateRange,
    getTotalsByType
  };
};
