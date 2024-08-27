import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { AlertContextProvider } from '@contexts/AlertContext'
import { Global } from '@emotion/react'
import ErrorBoundary from '@shared/ErrorBoundary'
import Navbar from '@shared/Navbar'
import Layout from '@shared/Layout'

import globalStyles from '@styles/globalStyles'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
