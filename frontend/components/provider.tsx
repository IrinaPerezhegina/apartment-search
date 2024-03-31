'use client';

import { AppStore, store } from '@/store/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default Providers;
