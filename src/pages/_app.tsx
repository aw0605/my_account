import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { Global } from '@emotion/react'
import Layout from '@shared/Layout'

import globalStyles from '@styles/globalStyles'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Layout>
  )
}
