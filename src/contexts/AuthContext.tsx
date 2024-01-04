import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'
import {api} from '../services/apiClient'

import {toast} from 'react-toastify'

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps ={
  children: ReactNode
}


// criar o context
export const AuthContext = createContext({} as AuthContextData);


export function signOut(){
  try{
destroyCookie(undefined, '@pizzafordev.token')
Router.push('/')
  }
  catch{
console.log('error logout')
  }
}

//criar o provider
export function AuthProvider({children}: AuthProviderProps){

  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;
  
  useEffect(() => {
    const {'@pizzafordev.token': token } = parseCookies();
    if(token){
      api.get('/userInfo').then(response => {
        const {id, name, email} = response.data;

        setUser({
          id,
          name,
          email
        })
      }).catch(() =>{
        // se o token invalido efetuar o logoff e redirecionar para o login
        signOut();
      })
    }
  }, [])

  async function signIn({email, password}:SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      }) 
      const {id, name, token } = response.data
      setCookie(undefined, '@pizzafordev.token', token,{
        maxAge: 60 * 60 * 24 * 30, // Expiração do token one Month
        path: "/"
      } )

      setUser({
        id, name, email,
      })

      //next request
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Bem vindo')
      // Redirecionar para pagina principal /dashboard
      Router.push('/dashboard')
    }catch(err){
      console.log('Erro ao acessar', err)
console.log(err)
    }
  }

  async function signUp({name, email, password}: SignUpProps){
try{
const response = await api.post('/users', {
  name,
  email,
  password
})

toast.success("Cadastro criado com sucesso")
Router.push('/')
}catch(err){
toast.error("Erro ao cadastrar")
console.log(err)
}
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  )
}