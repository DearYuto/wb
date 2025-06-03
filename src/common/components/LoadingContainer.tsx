'use client';

import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const SPINNER_DELAY_MS = 500;

const LoadingContainer = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowSpinner(true);
      }, SPINNER_DELAY_MS);
    } else {
      setShowSpinner(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);

  return <>{showSpinner ? <Spinner /> : children}</>;
};

export default LoadingContainer;
