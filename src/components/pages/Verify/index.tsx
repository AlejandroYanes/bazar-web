import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { FlexBox, Title } from '@devland-ui/components';
import styled, { keyframes } from 'styled-components';
import { notifyEventChannel } from 'event-center';
import authApi from 'api/auth';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const SpinningEmoji = styled.span`
  font-size: 120px;
  color: ${({ theme }) => theme.colors.BRAND};
  animation: ${rotation};
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const VerifyPage = () => {
  const { location: { search }, push } = useHistory();
  const [failed, setFailed] = useState(false);

  const verifyAccount = useCallback(async () => {
    const { userId, secret } = qs.parse(search);

    if (!userId || !secret) {
      setFailed(true);
      return;
    }

    try {
      await authApi.confirmVerification(userId as string, secret as string);
      notifyEventChannel('USER_INFO_CHANGED');
      push('/');
    } catch (e) {
      setFailed(true);
    }
  }, [search]);

  useEffect(() => {
    setTimeout(verifyAccount, 500);
  }, []);

  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        push('/');
      }, 1000);
    }
  }, [failed]);

  if (failed) {
    return (
      <FlexBox direction="column" align="center" padding="80px 16px 32px">
        <Title level={1}>Ooh</Title>
        <Title level={3} margin="24px 0 48px">No pudimos completar la verificacion</Title>
        <span style={{ fontSize: '100px' }}>😢</span>
      </FlexBox>
    );
  }

  return (
    <FlexBox direction="column" align="center" padding="80px 16px 32px">
      <Title level={1}>Estás cerca</Title>
      <Title level={3} margin="24px 0 48px">Estamos verificando unos detalles</Title>
      <SpinningEmoji>꩜</SpinningEmoji>
    </FlexBox>
  );
};

export default VerifyPage;
