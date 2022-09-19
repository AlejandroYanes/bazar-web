import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  padding: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  transition: all 150ms linear;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;
