import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, FlexBox, IconButton, RenderIf } from 'activate-components';

const TopBar: FC = () => {
  const { push, location: { pathname }, goBack } = useHistory();
  return (
    <FlexBox justify="flex-end" align="center" padding="16px" height={80}>
      <RenderIf condition={pathname !== '/'}>
        <IconButton
          icon="CHEVRON_LEFT"
          size="large"
          onClick={goBack}
          margin="0 auto 0 0"
          padding="0"
        />
      </RenderIf>
      <IconButton icon="SEARCH" size="large" onClick={() => undefined} />
      <IconButton icon="TICKET" size="large" onClick={() => push('/cart')} mL mR />
      <Avatar src="user1" />
    </FlexBox>
  );
};

export default TopBar;
