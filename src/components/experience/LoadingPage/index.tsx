import { FlexBox, SpinningDots } from '@devland-ui/components';
import TopBar from 'components/experience/TopBar';

const LoadingPage = () => (
  <FlexBox direction="column" justify="flex-start" align="stretch" height="100vh">
    <TopBar />
    <SpinningDots style={{ margin: 'auto' }} />
  </FlexBox>
);

export default LoadingPage;
