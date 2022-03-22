import styled from 'styled-components';
import { getBgdColor, getFontColor } from 'activate-components';

export const ImageHolder = styled.header`
  position: relative;
  width: 100%;
  min-height: 360px;
  background-color: rgba(0, 0, 0, 0.04);
`;

export const Counter = styled.span`
  padding: 8px 16px;
  border-radius: 100px;
  color: white;
  font-weight: 700;
  background-color: ${getFontColor};
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border: none;
  padding: 16px;
  background: ${getBgdColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
