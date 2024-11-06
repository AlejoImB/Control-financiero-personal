import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background-color: ${props => {
    switch (props.variant) {
      case 'secondary': return '#6c757d';
      case 'danger': return '#e74c3c';
      case 'success': return '#2ecc71';
      default: return '#007bff';
    }
  }};
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
