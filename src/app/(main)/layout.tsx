import Image from 'next/image'
import { User } from 'lucide-react'
import { getUser } from '@/lib/auth'
import { cookies } from 'next/headers'
import logo from '../../assets/logo.svg'
import { ReactNode } from 'react'
import Link from 'next/link'

export default function AppLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <main className="relative grid min-h-screen grid-cols-2">
      <div className="absolute bottom-0 left-1/2 top-0 ml-2 min-h-screen w-2  bg-stripes" />
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r-2 border-white/10 bg-[url(../assets/stars.svg)] px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {isAuthenticated ? (
          <div className="group flex items-center gap-3 text-left ">
            <Image
              alt="userImage"
              src={getUser().avatarUrl}
              width={40}
              height={1}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 transition-colors group-hover:bg-gray-50"
            ></Image>
            <p className="max-w-[140px] text-sm leading-snug">
              {getUser().name}
              <a
                href="/api/auth/logout"
                className="block text-red-400 hover:text-red-300"
              >
                Sair
              </a>
            </p>
          </div>
        ) : (
          <a
            href="/login"
            className="group flex items-center gap-3 text-left transition-colors hover:text-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 transition-colors group-hover:bg-gray-50">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <p className="max-w-[140px] text-sm leading-snug">
              <span className="underline">Crie sua conta</span> e salve suas
              memórias!
            </p>
          </a>
        )}

        <div className="flex flex-col justify-start gap-6">
          <Image src={logo} alt="Logo NLW Spacetime" />
          <div className="flex max-w-[400px] flex-col space-y-1">
            <h1 className="text-4xl font-bold leading-tight text-gray-50">
              Sua cápsula do tempo
            </h1>
            <p>
              Compartilhe momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>
          <Link
            href="/memories/new"
            className="flex h-8 w-52 items-center justify-center rounded-full bg-green-500 font-alt text-sm text-black hover:bg-green-600"
          >
            CADASTRAR LEMBRANÇA
          </Link>
        </div>

        <p>Feito por Rafael no NLW da Rocketseat</p>
      </div>
      <div className="relative flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/stars.svg)]">
        {children}
      </div>
    </main>
  )
}
