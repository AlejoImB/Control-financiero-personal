import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 50px;
`;

export const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </NotFoundContainer>
  );
};
