import '@/styles/globals.scss';
import '@/styles/custom.scss';
import type { AppProps } from 'next/app';
import Providers from '@/components/provider';

const App = ({ Component, pageProps }: AppProps) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
);

export default App;
