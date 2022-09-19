import React, { FunctionComponent, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@devland-ui/components';
import ModalRenderer from './ModalRenderer';
import LoadingModal from './LoadingModal';
import EmptyModal from './EmptyModal';

const loading = <LoadingModal />;
const error = <EmptyModal />;

const ModalStack: FunctionComponent = () => {
  const { hash } = useLocation();

  if (hash) {
    return (
      <ErrorBoundary errorMessage={error}>
        <Suspense fallback={loading}>
          <ModalRenderer hash={hash} />
        </Suspense>
      </ErrorBoundary>
    )
  }

  return null;

};

export default ModalStack;
