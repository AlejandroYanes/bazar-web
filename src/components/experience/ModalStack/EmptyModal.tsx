import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { FlexBox, Modal, Title, ExclamationTriangleIcon } from '@devland-ui/components';

const EmptyModal: FunctionComponent = () => {
  const { goBack } = useHistory();

  return (
    <Modal visible onClose={goBack}>
      <FlexBox direction="column" align="center" margin="48px">
        <ExclamationTriangleIcon color="WARNING" width={72} height={72} />
        <Title level={3} mT>Oops, looks like there was some error.</Title>
      </FlexBox>
    </Modal>
  );
};

export default EmptyModal;
