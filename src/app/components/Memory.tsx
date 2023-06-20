import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
dayjs.locale(ptBr)
interface MemoryProps {
  memory: {
    content: string
    coverUrl: string
    userId: string
    id: string
    isPublic: boolean
    createdAt: Date
  }
}

export default function Memory({ memory }: MemoryProps) {
  return (
    <div className="relative space-y-4">
      <time className="-ml-14 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de] MMMM, YYYY')}
      </time>
      {/\.(jpg|jpeg|png|webp|avif|gif|tiff|tif|bmp)$/.test(
        memory.coverUrl,
        // eslint-disable-next-line
      ) ? (<img alt="memory img" src={memory.coverUrl} className="w-full rounded-lg object-cover" />) : (
        <video
          src={memory.coverUrl}
          controls
          className="w-full rounded-lg object-cover"
        />
      )}
      <p className="block w-full flex-1 resize-none break-words rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100">
        {memory.content}
      </p>
    </div>
  )
}
