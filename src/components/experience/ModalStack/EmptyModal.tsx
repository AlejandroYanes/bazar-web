import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { FlexBox, Modal, SvgIcon, Title } from 'activate-components';

const EmptyModal: FunctionComponent = () => {
  const { goBack } = useHistory();

  return (
    <Modal visible onClose={goBack}>
      <FlexBox direction="column" align="center" margin="48px">
        <SvgIcon
          icon="EXCLAMATION_TRIANGLE"
          size="page"
          color="WARNING"
        />
        <Title level={3} mT>Oops, looks like there was some error.</Title>
      </FlexBox>
    </Modal>
  );
};

export default EmptyModal;
