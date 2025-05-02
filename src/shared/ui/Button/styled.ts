import styled from 'styled-components';
import { ButtonProps } from './types';

export const ButtonStyled = styled.button<ButtonProps>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${({ theme, $primary }) => 
    $primary ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $primary }) => 
    $primary ? '#fff' : theme.colors.text};
  border: 1px solid ${({ theme, $primary }) => 
    $primary ? theme.colors.primary : theme.colors.text};
  
  &:hover {
    opacity: 0.9;
  }
`; 