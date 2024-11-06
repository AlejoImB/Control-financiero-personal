import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '../UI/Card';

const SidebarContainer = styled(Card)`
  width: 250px;
  height: 100%;
  padding: 20px;
  background-color: #f8f9fa;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
  border-radius: 4px;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <NavList>
        <NavItem>
          <NavLink to="/">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/transactions">Transactions</NavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};