import {FormEvent, useContext, useState} from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Head from 'next/head'
import logoImg from '../../public/logo.svg'
import Image from 'next/image'
import {Input } from '@/components/ui/Input'
import {LockSimple, Envelope} from 'phosphor-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { toast } from 'react-toastify'

import {canSSRGuest} from '@/utils/canSSRGuest'

export default function Home() {

  // consumir o contexto de authentication
  const   {signIn} = useContext(AuthContext);
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent){
    e.preventDefault();
if(email === '' || password === ''){
  toast.warning('Preencha os campos')
}
setLoading(true)
    let data = {
      email,
      password,
    }

    
   await signIn(data);

setLoading(false)   
  }
  return (
    <>
    <Head>
      <title>Login</title>
    </Head>

    <div className="flex  flex-col justify-center items-center min-h-screen 
                ">
      <div className="flex items-center flex-col w-96 sm-3/4 ">
<Image src={logoImg} alt='Logo Pizzaria' className='sm:size-4/5'/>
      <span className='-mt-12 ml-28'>Faça login e comece a usar</span>
      </div>
      

      
        <div className="flex  flex-col justify-center w-96 my-10 gap-32
                        sm:w-3/4 ">
        <form 
              onSubmit={handleLogin}
              className='flex  justify-center flex-col gap-8 '>

        <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-3'>
          <label>
          Digite seu e-mail
          </label>
            <Input.Root>
            <Input.Icon>
            <Envelope size={24}/>
            </Input.Icon>
            <Input.Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='example@email.com'/>
            </Input.Root>
        </div>  
        
        <div className='flex flex-col gap-3'>
            <label >
            Sua senha
            </label>
            <Input.Root>
              <Input.Icon>
              <LockSimple size={24}/>
              </Input.Icon>
              <Input.Input  
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='********'
                />
            </Input.Root>
          </div>
        </div>
        
          

          <Button
          type="submit"
          loading={loading}>
            Acessar
        </Button>

          </form>  
        </div>

    <Link href="/signup" className="text-sm underline text-title hover:underline cursor-pointer hover:text-white transition-colors duration-300">

      Registrar minha empresa

    </Link>
    
  
    </div>
  </>
  )
}

export const getServerSideProps = canSSRGuest(async (context) => { //fn é o server sid props
return {
  props: {}
}
})