import { FC, useState } from 'react';
import { FlexBox, IconButton, Input } from 'activate-components';

const SearchBox: FC = () => {
  const [search, setSearch] = useState('');
  return (
    <FlexBox as="header" align="center" padding="16px">
      <Input
        placeholder="Buscar"
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
  )
};

export default SearchBox;
