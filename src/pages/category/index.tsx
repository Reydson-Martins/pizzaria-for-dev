import { Header } from "@/components/Header"
import Head from "next/head"
import { FormEvent, useState } from "react"
import {setupAPIClient} from '@/services/api'
import { toast } from "react-toastify"
import {canSSRAuth} from '@/utils/canSSRAuth' 

export default function Category(){

  const [name, setName] = useState('')
  async function handleRegist(event: FormEvent){
    event.preventDefault();
    if(name === ''){
      return;
    }
    const apiClient = setupAPIClient();
    await apiClient.post('/category',{
      name: name
    })
    toast.success("Categoria Cadastrada")

    setName('')
  }
  return (
    <>
    <Head>
      <title>Categoria</title>
    </Head>
    <Header />

    <div className="max-w-3xl my-16 mx-auto px-8 flex flex-col ">
      
      <main>
        <h1 className="text-white text-4xl font-bold ">Nova Categoria</h1>

        <form onSubmit={handleRegist}
              className="flex flex-col my-4 gap-5" >
          <input type="text"
                placeholder="Digite o nome para a nova categoria" 
                className="bg-input text-white p-4 border-none rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
          <button type="submit"
                   className="bg-ciano-500 text-title p-4 border-none rounded">
            Cadastrar
          </button>
        </form>
      </main>
    </div>    
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return{
    props:{}
  }
})