import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  ChevronLeftIcon,
  FlexBox,
  IconButton,
  RenderIf, SearchIcon, TicketIcon
} from 'activate-components';

const TopBar: FC = () => {
  const { push, location: { pathname }, goBack } = useHistory();
  return (
    <FlexBox justify="flex-end" align="center" padding="16px" height={80}>
      <RenderIf condition={pathname !== '/'}>
        <IconButton
          icon={<ChevronLeftIcon />}
          size="large"
          onClick={goBack}
          margin="0 auto 0 0"
          padding="0"
        />
      </RenderIf>
      <IconButton
        icon={<SearchIcon />}
        size="large"
        onClick={() => undefined}
      />
      <IconButton
        icon={<TicketIcon />}
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
