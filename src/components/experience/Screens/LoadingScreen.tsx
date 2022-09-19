import { FunctionComponent } from 'react';
import { FlexBox, PositionProps, SpinningDots } from '@devland-ui/components';

const LoadingScreen: FunctionComponent<PositionProps> = (props) => {
  return (
    <FlexBox
      width="100%"
      direction="column"
      justify="center"
      align="center"
      {...props}
    >
      <SpinningDots size="large" />
    </FlexBox>
  );
};

LoadingScreen.defaultProps = {
  padding: '48px',
};

export default LoadingScreen;
