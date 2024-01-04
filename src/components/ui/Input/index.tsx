
import { ElementType, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'





//Input Root
export interface TextInputRootProps{
  children: ReactNode;
}

function TextInputRoot({children}: TextInputRootProps){
return(
  <div className="flex items-center py-3 px-4 gap-3 bg-input rounded 
                  focus-within:border-2 border-ciano-200">
    {children}
  </div>
)
}


//Input Input
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{

}

function TextInputInput ({...rest}: TextInputProps){
  return(
  <input className="bg-transparent text-title flex-1 w-96
                    placeholder:text-subtitle"
  {...rest}
    />


  )
}

//Input Icon
export interface TextInputIconProps{
  children: ReactNode;
}
function TextInputIcon({children} : TextInputIconProps){
return (
  <>
    {children}
  </>

)
}




//Input Area
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
}

function TextInputArea({...rest}: TextAreaProps){
  return(
    <textarea className="" {...rest}/>
  )
  }


  

  export const Input = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Icon: TextInputIcon,
    TextArea: TextInputArea
  }