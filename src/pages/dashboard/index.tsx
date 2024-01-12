import { Header } from '@/components/Header'
import {canSSRAuth} from '@/utils/canSSRAuth'
import Head from 'next/head'
import { ArrowsClockwise } from 'phosphor-react'
import {setupAPIClient} from '@/services/api'
import { useState } from 'react'
import Modal from 'react-modal'
import { ModalOrder } from '@/components/ModalOrder'

type OrdemItemProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null
}
interface OrderProps {
orders: OrdemItemProps[];

}


export type OrderItemProps = {
  id:  string;
  amount: number;
  order_id: string;
  product: {
    id: string;
    name:  string;
    description: string;
    price: string;
    banner: string
  };
  order:  {
    id: string;
    table: string;
    status: boolean;
    name: string | null;
  }

}

export default function Dashboard({orders}:OrderProps){

 //console.log(orders)
  const [orderList, setOrder] = useState (orders || [])

 const [modalItem, setModalItem] = useState<OrderItemProps[]>()
 const [modalVisible, setModalVisible] = useState(false)

 function handleCloseModal(){
  setModalVisible(false)
  
 }
 async function handleOpenDetail (id: string) {
console.log(id)
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/order/detail', {
      params:{
        order_id: id
      }
    })

    
    setModalItem(response.data)
    console.log(response)
    
    setModalVisible(true)
  }

Modal.setAppElement('#__next');

  return(
    <>
      <Head>
      <title>Pedidos </title>
    </Head>
    <div>
    <Header />
    <main className="max-w-3xl my-16 mx-auto px-8 flex flex-col">
      <div className='flex gap-4 items-baseline'>
        <h1 className="text-white text-4xl font-bold ">Pedidos</h1>
        <button className='bg-transparent'>
            <ArrowsClockwise size={24} weight='fill'
                            className='text-ciano-500 
                                      hover:text-ciano-500 hover:scale-110' />
        </button>
      </div>

      <article className=' my-4 flex flex-col gap-4'>
        {orderList.map(item => {
          return(
            <section key={item.id} className=' h-[3.75rem] flex bg-input rounded' >
            <button className=' bg-transparent flex gap-4 items-center'
                    onClick={() => handleOpenDetail(item.id)}
            >
              <div className=' h-[3.75rem] w-2 rounded-l bg-ciano-500'></div>
              <span className='text-title font-bold text-2xl'>Mesa - {item.table}</span>
            </button>
          </section>
          )
        })}
      </article>
    </main>

    {modalVisible && (
      <ModalOrder 
      isOpen={modalVisible}
      onRequestClose={handleCloseModal}
      order={modalItem} />
    )}
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {

  const apiClient = setupAPIClient(context);
  const responseOrders = await apiClient.get('/orders');
  //console.log(responseOrders.data)

  return {
  props:{
    orders: responseOrders.data
    
  }
}
})
