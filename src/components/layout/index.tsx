import { FC, useState } from 'react';
import { FlexBox, Input, IconButton } from 'activate-components';

const Layout:FC = (props) => {
  const { children } = props;
  const [search, setSearch] = useState('');

  return (
    <FlexBox direction="column" align="stretch">
      <FlexBox padding="16px" align="center">
        <Input
          placeholder="Search"
          value={search}
          onChange={setSearch}
          style={{ flex: 1 }}
        />
        <IconButton
          icon="FILTER"
          variant="flat"
          color="brand"
          size="large"
          mL
          onClick={() => undefined}
        />
      </FlexBox>
      {children}
    </FlexBox>
  );
};

export default Layout;
