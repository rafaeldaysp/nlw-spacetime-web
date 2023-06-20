import NewMemoryForm from '@/app/components/NewMemoryForm'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr)

export default function New() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-14">
      <time className="-ml-14 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(Date.now()).format('D[ de] MMMM, YYYY')}
      </time>
      <Link
        href="/"
        className="flex items-center text-sm transition-colors hover:text-gray-50"
      >
        <ChevronLeft size={20} /> voltar à timeline
      </Link>
      <NewMemoryForm memory={undefined} />
    </main>
  )
}
