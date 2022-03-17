import { FC } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { SvgIcon, Title } from 'activate-components';

interface Props {
  name: string;
}

const Button = styled.button`
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

const PageBackButton: FC<Props> = (props) => {
  const { name } = props;
  const { goBack } = useHistory();
  return (
    <Button onClick={goBack}>
      <SvgIcon icon="CHEVRON_LEFT" color="BRAND" />
      <Title level={1} color="brand">{name}</Title>
    </Button>
  );
};

export default PageBackButton;
