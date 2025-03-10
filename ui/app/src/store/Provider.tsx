'use client';

import { Provider } from 'react-redux';
import { store } from './index';

interface Props {
  children: React.ReactNode;
}

const StoreProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;