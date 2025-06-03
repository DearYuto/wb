import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollTriggerProps {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  enabled?: boolean;
}

export const useInfiniteScrollTrigger = ({
  fetchNextPage,
  hasNextPage = true,
  enabled = true,
}: UseInfiniteScrollTriggerProps) => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (!enabled) return;

    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, enabled, fetchNextPage]);

  return { ref };
};
