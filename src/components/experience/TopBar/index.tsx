import { FC } from 'react';
import { Avatar, FlexBox, IconButton } from 'activate-components';

const TopBar: FC = () => (
  <FlexBox align="center" padding="16px">
    <Avatar src="user1" style={{ marginRight: 'auto' }} />
    <IconButton icon="SEARCH" size="large" onClick={() => undefined} />
    <IconButton icon="TICKET" size="large" onClick={() => undefined} mL />
  </FlexBox>
);

export default TopBar;
