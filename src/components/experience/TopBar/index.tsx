import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  FlexBox,
  IconButton,
  RenderIf,
} from 'activate-components';
import { SimpleCart, ArrowLeft, Search } from 'iconoir-react';
import IconoirIcon from '../IconoirIcon';

const TopBar: FC = () => {
  const { push, location: { pathname }, goBack } = useHistory();
  return (
    <FlexBox justify="flex-end" align="center" padding="16px 16px 16px 0" height={80}>
      <RenderIf condition={pathname !== '/'}>
        <IconButton
          icon={<IconoirIcon icon={ArrowLeft} />}
          size="large"
          onClick={goBack}
          margin="0 auto 0 0"
          padding="0"
        />
      </RenderIf>
      <IconButton
        icon={<IconoirIcon icon={Search} />}
        size="large"
        onClick={() => undefined}
      />
      <IconButton
        icon={<IconoirIcon icon={SimpleCart} />}
        size="large"
        onClick={() => push('/cart')}
        mL
        mR
      />
      <Avatar src="user1" />
    </FlexBox>
  );
};

export default TopBar;
