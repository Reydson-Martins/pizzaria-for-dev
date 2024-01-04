
import Head from 'next/head'
import logoImg from 'public/logo.svg'
import Image from 'next/image'
import {Input } from '@/components/ui/Input'
import {User, LockSimple, Envelope} from 'phosphor-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useContext, FormEvent, useState } from 'react'
import {toast} from 'react-toastify'

import {AuthContext } from '@/contexts/AuthContext'

export default function Signup() {

  const {signUp} = useContext(AuthContext);
  const [ name, setName] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ loading, setLoading] = useState(false);

let dataSignUP = {
  name,
  email,
  password,
}

  async function handleSignUp(event: FormEvent){
    event.preventDefault();
    
    if(name === '' || email === '' || password === ''){
      toast.error("Preencha os campos vazios")
      return;
    }
setLoading(true);

await signUp(dataSignUP);


setLoading(false);
  }

  return (
    <>
    <Head>
      <title>Cadastro</title>
    </Head>

    <div className="flex  flex-col justify-center items-center min-h-screen 
                ">
      <div className="flex items-center flex-col w-96 sm-3/4 ">
<Image src={logoImg} alt='Logo Pizzaria' className='sm:size-4/5'/>
      </div>
      

      
        <div className="flex  flex-col justify-center w-96 my-10 gap-32
                        sm:w-3/4 ">
        <form className='flex  justify-center flex-col gap-8'
              onSubmit={handleSignUp}>

        <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-3'>
          <label>
          Nome
          </label>
            <Input.Root>
            <Input.Icon>
            <User size={24}/>
            </Input.Icon>
            <Input.Input  type='text'
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            placeholder='Nome'/>
            </Input.Root>
        </div>  
        <div className='flex flex-col gap-3'>
          <label>
          Digite seu e-mail
          </label>
            <Input.Root>
            <Input.Icon>
            <Envelope size={24}/>
            </Input.Icon>
            <Input.Input  type='text'
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
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
              <Input.Input  type='password'
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              placeholder='********'/>
            </Input.Root>
          </div>
        </div>
        
          

          <Button
          type="submit"
          loading={loading}>
            Cadastrar
        </Button>

          </form>  
        </div>

    <Link href="/" className="text-sm underline text-title hover:underline cursor-pointer hover:text-white transition-colors duration-300">

      Já possuo uma conta

    </Link>
    
  
    </div>
  </>
  )
}
