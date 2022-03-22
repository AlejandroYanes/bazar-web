import { FunctionComponent } from 'react';
import { ExclamationTriangleIcon, PositionProps } from 'activate-components';
import MessageScreen from './Message';

interface Props extends PositionProps {
  lines?: string[];
}

const ErrorScreen: FunctionComponent<Props> = (props) => {
  const { lines, children, ...rest } = props;

  return (
    <MessageScreen
      icon={<ExclamationTriangleIcon color="WARNING" width={72} height={72} />}
      title="Oo, algo salió mal."
      lines={lines}
      {...rest}
    >
      {children}
    </MessageScreen>
  );
};

export default ErrorScreen;
