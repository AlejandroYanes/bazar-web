import { FC } from 'react';
import { FlexBox } from 'activate-components';

const Layout:FC = (props) => {
  const { children } = props;

  return (
    <FlexBox as="article" direction="column" align="stretch" height="100%">
      {children}
    </FlexBox>
  );
};

export default Layout;
