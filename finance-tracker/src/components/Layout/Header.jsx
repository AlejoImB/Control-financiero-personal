import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Logout } from '../Auth/Logout';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1976d2;
  padding: 1rem;
  color: white;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Header = () => {
  const { user } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <h1>Control Financiero Personal</h1>
        <Nav>
          {user ? (
            <>
              <StyledLink to="/">Dashboard</StyledLink>
              <StyledLink to="/transactions">Transactions</StyledLink>
              <Logout />
            </>
          ) : (
            <>
              <StyledLink to="/login">Login</StyledLink>
              <StyledLink to="/register">Register</StyledLink>
            </>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};