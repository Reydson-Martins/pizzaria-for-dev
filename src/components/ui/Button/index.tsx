import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { SpinnerGap } from 'phosphor-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?: boolean,
  children: ReactNode

}

export function Button({loading, children,...res}:ButtonProps){
  return(
<button 
disabled={loading}
className="bold max-w-xl py-3 px-4 bg-ciano-500 text-white rounded
          hover:bg-ciano-200  transition-colors duration-300 ">
            
  {loading ? (
    <SpinnerGap className='motion-reduce:hidden animate-spin text-white cursor-not-allowed' size={22}/>
    
  ) : (
    <a className='font-semibold cursor-pointer'> {children}</a>
  )}
  
</button>
  )
}

