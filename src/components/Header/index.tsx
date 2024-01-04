import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"
import Link from "next/link"
import {SignOut} from "phosphor-react"
export function Header(){

  const {signOut} = useContext(AuthContext);

  return(
    <header className="h-2">
      <div className="flex justify-between items-center ">
      <Link href="/dashboard">
        <img src="/logo.svg" width={190} height={60} />
      </Link>
      <nav className="flex justify-center items-center gap-3
                      text-white">
        <Link href="/categoria">Categoria</Link>
        <Link href="/product">Cardápio</Link>
        <button
              onClick={signOut}>
          <SignOut size={24} color="white" />
        </button>
      </nav>
      </div>
    </header>
  )
}