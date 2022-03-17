import styled from 'styled-components';
import { getFontColor } from 'activate-components';

export const ImageHolder = styled.div`
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
