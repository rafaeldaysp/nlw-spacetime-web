'use client'

export default function MemoryOptions() {
  return (
    <>
      <button className="flex h-8 w-24 items-center justify-center rounded-full bg-green-500 font-alt text-sm text-black hover:bg-green-600">
        Editar
      </button>
      <button className="flex h-8 w-24 items-center justify-center rounded-full bg-red-500 font-alt text-sm text-black hover:bg-red-600">
        Excluir
      </button>
    </>
  )
}
