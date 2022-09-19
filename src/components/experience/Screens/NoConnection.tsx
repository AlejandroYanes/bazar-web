import { FunctionComponent } from 'react';
import { Button, PositionProps } from '@devland-ui/components';
import ErrorScreen from './Error';

interface Props extends PositionProps {
  message: string;
}

const reloadPage = () => window.location.reload();

const NoConnectionScreen: FunctionComponent<Props> = (props) => {
  const { message, ...rest } = props;
  const lines = [message, 'Please check your internet connection or reload the page.'];

  return (
    <ErrorScreen lines={lines} {...rest}>
      <Button
        mT
        label="Reload"
        variant="fill"
        color="warning"
        onClick={reloadPage}
      />
    </ErrorScreen>
  );
};

export default NoConnectionScreen;
