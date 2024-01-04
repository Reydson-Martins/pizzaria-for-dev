import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {parseCookies} from 'nookies'

//  access unlock pages
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(context);
    if(cookies['@pizzafordev.token']){ // se tiver cookies sera direcionado para a page dashboard
      return {
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
      
    }
    return await fn(context);
  }
}