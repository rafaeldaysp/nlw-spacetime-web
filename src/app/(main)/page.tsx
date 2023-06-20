import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ptBr from 'dayjs/locale/pt-br'
import Memory from '../components/Memory'

interface MemoryProps {
  content: string
  coverUrl: string
  userId: string
  id: string
  isPublic: boolean
  createdAt: Date
}
dayjs.locale(ptBr)

export default async function Main() {
  const isAuthenticated = cookies().has('token')

  let memories: MemoryProps[] = []
  if (isAuthenticated) {
    const token = cookies().get('token')?.value
    memories = (
      await api.get('/memories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data
  }
  if (!isAuthenticated || memories.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="w-[360px] text-center leading-relaxed">
          Você ainda não registrou nenhuma lembrança, comece a{' '}
          <a href="" className="underline hover:text-gray-50">
            criar agora!
          </a>
        </p>
      </div>
    )
  }
  return (
    <div className="relative flex flex-col gap-10 p-14">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="">
            <Memory
              memory={{
                content:
                  memory.content.length > 250
                    ? memory.content.substring(0, 247).concat('...')
                    : memory.content,
                coverUrl: memory.coverUrl,
                createdAt: memory.createdAt,
                id: memory.id,
                isPublic: memory.isPublic,
                userId: memory.userId,
              }}
            />
            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-1.5 text-sm text-gray-200 transition-colors hover:text-gray-50"
            >
              Ler mais <ArrowRight size={20} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
