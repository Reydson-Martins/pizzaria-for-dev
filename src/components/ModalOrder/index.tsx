import Modal from 'react-modal'

import {X} from 'phosphor-react'
import { OrderItemProps } from '@/pages/dashboard';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
}

export function ModalOrder({isOpen, onRequestClose, order}: ModalOrderProps){

  const customStyles = {
    content: {
      
    }
  }
  return(
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-input"
    >
<button type='button'
        onClick={onRequestClose}
        className='react-modal-close'   
>
<X size={32} weight="bold" />
</button>

<div>
  <h2>Detalhes do pedido</h2>
 <span>Mesa: <strong>{order[0].order.table}</strong></span> 

{order.map(item =>(
  <section key={item.id}>
    <span>{item.amount}</span> - <span>{item.product.name}</span>
    <span>{item.product.description}</span>
  </section>
))}
</div>
    </Modal>
  )
}