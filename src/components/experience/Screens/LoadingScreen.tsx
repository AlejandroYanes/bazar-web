import { FunctionComponent } from 'react';
import { FlexBox, PositionProps, SpinningDots } from '@devland-ui/components';

const LoadingScreen: FunctionComponent<PositionProps> = (props) => {
  const { padding = '48px', ...rest } = props;
  return (
    <FlexBox
      width="100%"
      direction="column"
      justify="center"
      align="center"
      padding={padding}
      {...rest}
    >
      <SpinningDots size="large" />
    </FlexBox>
  );
};

export default LoadingScreen;
