import { Header } from "@/components/Header"
import Head from "next/head"
import { ChangeEvent, FormEvent, useState } from "react"
import {setupAPIClient} from '@/services/api'
import { toast } from "react-toastify"
import {canSSRAuth} from '@/utils/canSSRAuth'
import { DownloadSimple } from "phosphor-react"


type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[]
}

export default function Product({categoryList}: CategoryProps){

  //console.log(categoryList)
 
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageAvatar, setImageAvatar] = useState(null)
  const [ categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)
  
  function handleFile (e: ChangeEvent<HTMLInputElement> ){
    if(!e.target.files){
      return
    }
    const image = e.target.files[0];
    if(!image) {
      return
    }
    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0])) //url para o preview
    }
  }

function handleSelectedCategory(e){
// category selected
//console.log(categories[e.target.value])
setCategorySelected(e.target.value)
}

  async function handleRegister(event: FormEvent){
    event.preventDefault();

    try{ 
      const data = new FormData(); //formato de envio multipart
      if(name === '' || price === '' || description === '' || imageAvatar === null ){
        toast.error("Preencha todos os campos")
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

    const apiClient = setupAPIClient();
    await apiClient.post('/product', data);
    toast.success("Produto cadastrado")

  

    }catch(err){
      console.log(err);
      toast.error("Erro ao cadastrar")
    }

    setName('');
    setPrice('');
    setDescription('');
    setCategorySelected(0);
    setImageAvatar(null);
    setAvatarUrl('');

  
  }

  return (
    <>
    <Head>
      <title>Novo Produto</title>
    </Head>
    <Header />

    <div className="max-w-3xl my-16 mx-auto px-8 flex flex-col ">
      
      <main>
        <h1 className="text-white text-4xl font-bold ">Novo Produto</h1>

        <form onSubmit={handleRegister}
              className="flex flex-col my-4 gap-3" >
          <label className=" h-52 bg-input rounded p-4 flex justify-center items-center
                            cursor-pointer">
            <span className=" transition-all z-40 absolute
                              hover:scale-125"><DownloadSimple size={32} /></span>
            <input className="hidden" 
            type="file" accept="image/png, image/jpeg"
            onChange={handleFile} />
            {avatarUrl && (
                <img
                 src={avatarUrl} alt="foto do produto"
                 className=" shadow-md shadow-subtitle w-auto h-full object-cover rounded"
                 />
            )}
           
          
          </label>
          <select className="bg-input text-white rounded p-4"
                  value={categorySelected} onChange={handleSelectedCategory}>
                    
                     {categories.map((item, index) => {
                      return(
                        <option key={item.id} value={index}>{item.name}</option>
                      )
                     })}
          {/*            {categories.map( (item, index) => {
              return(
              <option key={item.id} value={index}>
                {item.name}
                </option>)
            }) } */}
          </select>
          <input type="text"
                placeholder="Digite o nome do produto" 
                className="bg-input text-white p-4 border-none rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
          <input type="text"
                placeholder="Valor produto" 
                className="bg-input text-white p-4 border-none rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}/>
          <textarea className="bg-input text-white p-4 rounded"
                    placeholder="Descreva seu produto..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
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

  const apiClient = setupAPIClient(context);
  const responseCategory = await apiClient.get('/category');

  //console.log(responseCategory.data)

  return{
    props:{
      categoryList: responseCategory.data
    }
  }
})