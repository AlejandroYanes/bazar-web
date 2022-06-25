import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  FlexBox,
  IconButton,
  RenderIf,
} from 'activate-components';
import { SimpleCart, ArrowLeft, Search, User } from 'iconoir-react';
import { useUserInfo } from 'components/providers/Auth';
import IconoirIcon from '../IconoirIcon';

const TopBar: FC = () => {
  const { push, location: { pathname }, goBack } = useHistory();
  const { isAnonymous, user } = useUserInfo();

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
      <RenderIf condition={!user || isAnonymous} fallback={<Avatar src="user1" />}>
        <IconButton
          icon={<IconoirIcon icon={User} />}
          size="large"
          onClick={() => push('/login')}
        />
      </RenderIf>
    </FlexBox>
  );
};

export default TopBar;
