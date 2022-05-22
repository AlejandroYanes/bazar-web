import { FC } from 'react';
import { FlexBox } from 'activate-components';

const Layout:FC = (props) => {
  const { children } = props;

  return (
    <FlexBox as="article" direction="column" align="stretch">
      {children}
    </FlexBox>
  );
};

export default Layout;
