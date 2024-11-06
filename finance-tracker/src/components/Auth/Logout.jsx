import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../UI/Button';

export const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};