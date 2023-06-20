'use client'

import { ImagePlus } from 'lucide-react'
import FileInput from './FileInput'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

interface Memory {
  content: string
  coverUrl: string
  userId: string
  id: string
  isPublic: boolean
  createdAt: Date
}

interface MemoryPreview {
  memory: Memory | undefined
}

export default function NewMemoryForm(memoryPreview: MemoryPreview) {
  const router = useRouter()
  const token = Cookie.get('token')

  const isImageOrVideo = (): string | undefined => {
    if (!memoryPreview?.memory) return undefined

    if (
      // eslint-disable-next-line
      memoryPreview.memory.coverUrl.includes('jpg' || 'jpeg' || 'png' || 'webp' || 'avif' || 'gif' || 'tiff' || 'tif' || 'bmp')
    )
      return 'image'
    else return 'video'
  }

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const file = formData.get('coverUrl')
    const fileInput = event.currentTarget.elements.namedItem(
      'coverUrl',
    ) as HTMLInputElement
    const isFileUploaded = fileInput?.files?.length

    let coverUrl = memoryPreview.memory?.coverUrl
    if (isFileUploaded) {
      const fileFormData = new FormData()
      fileFormData.set('file', file!)
      const uploadResponse = await api.post('/upload', fileFormData)
      coverUrl = uploadResponse.data.fileUrl
    }

    if (memoryPreview.memory) {
      await api.put(
        `/memories/${memoryPreview.memory.id}`,
        {
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } else {
      await api.post(
        '/memories',
        {
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    }
    router.push(`/memories/${memoryPreview.memory?.id}`)
  }
  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleCreateMemory}>
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer gap-2 transition-colors hover:text-gray-50"
        >
          <ImagePlus size={20} /> Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-2 transition-colors hover:text-gray-50"
        >
          <input
            type="checkbox"
            name="isPublic"
            defaultChecked={memoryPreview?.memory?.isPublic}
            id="isPublic"
            className="cursor-pointer rounded border-gray-400 bg-gray-700 text-purple-500 transition-colors hover:text-purple-300 focus:ring-0"
          />
          Tornar memória pública
        </label>
      </div>
      <FileInput
        fileType={isImageOrVideo()}
        url={memoryPreview?.memory ? memoryPreview.memory.coverUrl : undefined}
      />
      <textarea
        name="content"
        spellCheck="false"
        defaultValue={memoryPreview?.memory?.content}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre esta experiência que você quer lembrar para sempre."
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      ></textarea>
      <button
        type="submit"
        className="flex h-8 w-24 items-center justify-center rounded-full bg-green-500 font-alt text-sm text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
