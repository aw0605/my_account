import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import Layout from '@shared/Layout'

import globalStyles from '@styles/globalStyles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Layout>
  )
}
