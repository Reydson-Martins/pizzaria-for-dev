import Modal from 'react-modal'

import {X} from 'phosphor-react'
import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
}

export function ModalOrder({isOpen, onRequestClose, order}: ModalOrderProps){

/*   const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroudColor: '#4f7074'
    }
  } */
  return(
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-input max-w-2xl "
      //style={customStyles}
    >
<button type='button'
        onClick={onRequestClose}
        className='react-modal-close'   
>
<X size={32} weight="bold" />
</button>


<div>
  <h2>Detalhes do pedido</h2>
  <span>{order[0].id}</span>
  <span>Mesa: {order[0].order.table}</span>

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