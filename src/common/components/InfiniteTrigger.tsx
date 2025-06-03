import { forwardRef } from 'react';

export const InfiniteTrigger = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className="h-6" />;
});

InfiniteTrigger.displayName = 'InfiniteTrigger';
