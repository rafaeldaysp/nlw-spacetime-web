import Image from 'next/image'
import logo from '../../assets/logo.svg'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import Link from 'next/link'

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[url(../assets/stars.svg)] p-16">
      <Image src={logo} alt="Logo NLW Spacetime" />
      <div className="flex flex-col items-center justify-center space-y-10">
        <h1 className="text-4xl font-bold leading-tight text-gray-50 max-md:text-base">
          Entrar na cápsula do tempo
        </h1>
        <div className="flex flex-col items-center justify-center gap-2">
          <Link
            href="/login"
            className="grid h-8 w-72 grid-cols-6 items-center justify-between rounded-full bg-green-500 px-6 font-alt text-sm text-black hover:bg-green-600"
          >
            <FcGoogle size={20} className="" />
            <h1 className="col-span-4 flex justify-center">
              ENTRAR COM GOOGLE
            </h1>
          </Link>
          <Link
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
            className="grid h-8 w-72 grid-cols-6 items-center justify-between rounded-full bg-green-500 px-6 font-alt text-sm text-black hover:bg-green-600"
          >
            <BsGithub size={20} className="" />
            <h1 className="col-span-4 flex justify-center">
              ENTRAR COM GITHUB
            </h1>
          </Link>
        </div>
      </div>
      <p className="">Feito por Rafael no NLW da Rocketseat</p>
    </main>
  )
}
