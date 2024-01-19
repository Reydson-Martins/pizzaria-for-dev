import { Header } from "@/components/Header"
import Head from "next/head"
import { FormEvent, useState } from "react"
import {setupAPIClient} from '@/services/api'
import { toast } from "react-toastify"
import {canSSRAuth} from '@/utils/canSSRAuth' 
import {useForm} from "react-hook-form"

export default function Category(){



  const {register, handleSubmit, watch, reset, formState:{errors}} = useForm();
  function sumbitConsole (category: any) {
    console.log(category);
    reset();
  };

  const category = watch ('category')
  const isSubmitDisabled = !category;
 // const [name, setName] = useState('')
  async function handleRegist(event: FormEvent){
    console.log(category);
 
  // event.preventDefault()

    const apiClient = setupAPIClient();
    await apiClient.post('/category',{
      name: category
    })
    toast.success("Categoria Cadastrada")
   reset();
    //setName('')
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

        <form onSubmit={handleSubmit(handleRegist)}
              className="flex flex-col my-4 gap-5" >
          <input type="text"
                placeholder="DIGITE UMA  CATEGORIA" 
                className="bg-input text-white p-4 border-none rounded
                            focus:ring-1 focus:ring-ciano-200"
                {...register("category", {required: true, pattern: /[A-Z]/,})}
                // defaultValue=""{...register("category")}
               />
               {errors.category?.type === "pattern" && 
                  <p className="text-red-900">Digite  a categoria em Caixa  Alta</p>
                }
          <button type="submit"
                  disabled = {isSubmitDisabled}
                   className="bg-ciano-500 text-title p-4 border-none rounded
                              hover:bg-ciano-200
                   disabled:bg-ciano-700 disabled:cursor-not-allowed">
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