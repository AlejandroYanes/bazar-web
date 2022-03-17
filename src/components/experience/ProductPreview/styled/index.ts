import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled(Link)`
  display: flex;
  align-items: stretch;
`;

export const ImageHolder = styled.div`
  height: 80px;
  width: 80px;
  background-color: rgba(0, 0, 0, 0.04);
`;
