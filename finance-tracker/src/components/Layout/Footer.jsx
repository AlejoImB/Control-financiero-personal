import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 1rem 2rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Copyright = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        © {new Date().getFullYear()} Control Financiero Personal. Reservados todos los derechos.
      </Copyright>
      <FooterLinks>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
};
