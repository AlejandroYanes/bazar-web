import { FunctionComponent, ReactNode } from 'react';
import {
  FlexBox,
  PositionProps,
  Text,
  Title
} from '@devland-ui/components';

interface Props extends PositionProps {
  icon: ReactNode;
  title: string;
  lines?: string[];
}

const MessageScreen: FunctionComponent<Props> = (props) => {
  const { icon, title, lines, children, ...rest } = props;

  const textLines = lines
    ? lines.map(line => (
      <Text key={line} align="center">{line}</Text>
    ))
    : null;

  return (
    <FlexBox direction="column" align="center" {...rest}>
      {icon}
      <Title level={3} margin="24px 0 8px">{title}</Title>
      {textLines}
      {children}
    </FlexBox>
  );
};

export default MessageScreen;
