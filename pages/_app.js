import Head from 'next/head'

import Layout from '@components/Layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
  <Head>
    <title>Cats, Dogs &amp; Frogs</title>
    <link rel="icon" href="/frog-solid.svg" />
  </Head>
  <Layout><Component {...pageProps} /></Layout>
  </>)
}

export default MyApp
