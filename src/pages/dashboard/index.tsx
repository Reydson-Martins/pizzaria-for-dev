import { Header } from '@/components/Header'
import {canSSRAuth} from '@/utils/canSSRAuth'
import Head from 'next/head'
export default function Dashboard(){
  return(
    <>
      <Head>
      <title>Painel </title>
    </Head>
    <div>

    <Header />
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
return {
  props:{}
}
})