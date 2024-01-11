import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"
import Link from "next/link"
import {SignOut} from "phosphor-react"
export function Header(){

  const {signOut} = useContext(AuthContext);

  return(
    <header className="h-20 my-0 mx-auto max-w-7xl">
      <div className="flex mx-20 my-7 justify-between items-center ">
      <Link href="/dashboard" title="Painel de Pedidos">
        <img src="/logo.svg" width={190} height={60} />
      </Link>
      <nav className="flex justify-center items-center gap-9
                      text-white">
        <Link href="/category"
              className="hover:text-ciano-200">
                    Categoria
        </Link>
        <Link href="/product"
              className="hover:text-ciano-200">
                Cardápio
        </Link>
        <button className="text-white hover:text-ciano-700 hover:scale-110"
              onClick={signOut}>
          <SignOut size={24} />
        </button>
      </nav>
      </div>
    </header>
  )
}