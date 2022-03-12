import { FunctionComponent } from 'react';
import { PositionProps } from 'activate-components';
import MessageScreen from './Message';

interface Props extends PositionProps {
  lines?: string[];
}

const ErrorScreen: FunctionComponent<Props> = (props) => {
  const { lines, children, ...rest } = props;

  return (
    <MessageScreen
      icon="EXCLAMATION_TRIANGLE"
      color="WARNING"
      title="Oops, sorry about that."
      lines={lines}
      {...rest}
    >
      {children}
    </MessageScreen>
  );
};

export default ErrorScreen;
