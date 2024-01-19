import Modal from 'react-modal'

import {X} from 'phosphor-react'
import { OrderItemProps } from '../../pages/dashboard';
import Image from 'next/image';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id: string) => void;
}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}: ModalOrderProps){

  /* const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroudColor: '#4f7074'
    }
  } */console.log(order[0].product)
  return(
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="mx-auto m-32 p-8 max-w-2xl bg-background "
      //style={customStyles}  
    >

<div className='flex flex-col'>
  <h2 className="text-white text-3xl font-bold m-auto">Detalhes do pedido</h2>
  <span className='text-ciano-500 text-xl font-bold'>Mesa: {order[0].order.table}</span>


  {/* {item.product.banner} */}
{order.map(item =>(
  <section key={item.id}>
    <span>{item.amount}</span> - <span>{item.product.name}</span>
    console.log(item.product.banner)
     
{/*     <Image
      src={`${'http://localhost:3333'}/${item.product.banner}`}
      width={500}
      height={500}
      alt="Picture of the author"
    /> */}
  </section>
))}

<button onClick={() => handleFinishOrder(order[0].order_id)}>
  Concluir Pedido
</button>

<button type='button'
        onClick={onRequestClose}
        className='react-modal-close'   
>
<X size={32} weight="bold" />
</button>

</div>
    </Modal>
  )
}