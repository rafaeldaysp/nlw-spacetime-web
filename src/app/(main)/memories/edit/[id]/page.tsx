import NewMemoryForm from '@/app/components/NewMemoryForm'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface Memory {
  content: string
  coverUrl: string
  userId: string
  id: string
  isPublic: boolean
  createdAt: Date
}

interface Params {
  params: {
    id: string
  }
}

export default async function EditMemoryPage({ params }: Params) {
  const token = cookies().get('token')?.value
  try {
    const memoryResponse = await api.get(`/memories/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const memory: Memory = memoryResponse.data
    return (
      <main className="flex flex-1 flex-col gap-4 p-14">
        <time className="-ml-14 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de] MMMM, YYYY')}
        </time>
        <Link
          href="/"
          className="flex items-center text-sm transition-colors hover:text-gray-50"
        >
          <ChevronLeft size={20} /> voltar à timeline
        </Link>
        <NewMemoryForm memory={memory} />
      </main>
    )
  } catch (err) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="w-[360px] text-center leading-relaxed">
          Memória não encontrada. Comece a{' '}
          <a href="" className="underline hover:text-gray-50">
            criar agora!
          </a>
        </p>
      </div>
    )
  }
}
