import DeleteMemoryButton from '@/app/components/DeleteMemoryButton'
import Memory from '@/app/components/Memory'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface Params {
  params: {
    id: string
  }
}

interface MemoryData {
  content: string
  coverUrl: string
  userId: string
  id: string
  isPublic: boolean
  createdAt: Date
}

export default async function MemoryPage({ params: { id } }: Params) {
  const token = cookies().get('token')?.value
  try {
    const memoryResponse = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const memory: MemoryData = memoryResponse.data
    return (
      <div
        key={memory.id}
        className="relative  flex min-h-screen flex-col justify-between space-y-4 p-14"
      >
        <Memory memory={memory} />
        <div className="flex items-center gap-4">
          <Link
            href={`/memories/edit/${id}`}
            className="flex h-8 w-24 items-center justify-center rounded-full bg-green-500 font-alt text-sm text-black hover:bg-green-600"
          >
            Editar
          </Link>
          <DeleteMemoryButton memoryId={memory.id} />
        </div>
      </div>
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
