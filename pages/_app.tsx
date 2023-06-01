import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect,useState } from 'react'
import Head from 'next/head'

import { UserContextProvider } from '../components/providers/UserContext'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'


export default function App({ Component, pageProps }: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
    supabaseClient={supabaseClient}
    initialSession={pageProps.initialSession}
  >

  <UserContextProvider>
          <Head>
              <meta name="robots" content="noindex" />
              </Head>
        <Component {...pageProps} />
  </UserContextProvider>

  </SessionContextProvider>
  )


}
