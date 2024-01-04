import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {parseCookies, destroyCookie} from 'nookies'
import {AuthTokenError} from '@/services/errors/AuthTokenError'


//function pages access private
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
const cookies = parseCookies(context);

const token = cookies['@pizzafordev.token']

if(!token) {
  return{
    redirect:{
      destination: '/', //token is not exists 
      permanent: false,
    }
  }
}
try{
  return await fn(context);
}catch(err){ // se tiver um token e deu erro o token é destruído e direcionado para a home
  if(err instanceof AuthTokenError){ 
    destroyCookie(context,'@pizzafordev.token');
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }
}
}
}


