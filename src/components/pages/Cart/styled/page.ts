import styled from 'styled-components';
import { getBgdColor } from '@devland-ui/components';

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: ${getBgdColor};
`;
