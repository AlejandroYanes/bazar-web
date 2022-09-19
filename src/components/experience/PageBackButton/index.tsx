import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronLeftIcon, Title } from '@devland-ui/components';
import { Button } from './styled';
interface Props {
  name: string;
}

const PageBackButton: FC<Props> = (props) => {
  const { name } = props;
  const { goBack } = useHistory();
  return (
    <Button onClick={goBack}>
      <ChevronLeftIcon color="FONT" />
      <Title level={1} size={32} ellipsis>{name}</Title>
    </Button>
  );
};

export default PageBackButton;
