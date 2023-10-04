import axiosClient from '@/api-client/axios-client';
import { Auth } from '@/components/common';
import { EmptyLayout } from '@/components/layout';
import { AppPropsWithLayout } from '@/models';
import '@/styles/custom.css';
import '@/styles/globals.css';
import '@/styles/prism.css';
import { createEmotionCache, theme } from '@/utils';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';

// Client-side cache, share for the whole session ò the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Layout>
            <Auth requireLogin={Component.requireLogin ?? false}>
              <Component {...pageProps} />
            </Auth>
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
