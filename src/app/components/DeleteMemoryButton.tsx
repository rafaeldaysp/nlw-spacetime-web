'use client'

import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface DeleteMemoryProps {
  memoryId: string
}

export default function DeleteMemoryButton({ memoryId }: DeleteMemoryProps) {
  const token = Cookies.get('token')
  const router = useRouter()
  async function deleteMemory(id: string) {
    await api
      .delete(`/memories/${memoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => router.push('/'))
  }
  return (
    <button
      className='className="flex hover:bg-red-600" h-8 w-24 items-center justify-center rounded-full bg-red-500 font-alt text-sm text-black'
      onClick={() => deleteMemory(memoryId)}
    >
      Excluir
    </button>
  )
}
