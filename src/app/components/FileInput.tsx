'use client'

import { ChangeEvent, useEffect, useState } from 'react'

interface MediaPreview {
  fileType: string | undefined
  url: string | undefined
}

export default function FileInput(props: MediaPreview) {
  const [preview, setPreview] = useState<MediaPreview>()
  useEffect(() => {
    if (props.fileType) {
      setPreview(props)
    }
  }, [props])
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files || files.length === 0) return

    const previewType = files[0].type
    const previewURL = URL.createObjectURL(files[0])
    setPreview({ fileType: previewType, url: previewURL })
  }

  return (
    <>
      <input
        type="file"
        onChange={onFileSelected}
        name="coverUrl"
        id="media"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
      />
      {preview?.fileType}
      {(preview?.fileType?.startsWith('image') && (
        // eslint-disable-next-line
        <img
          alt="image preview"
          className="w-full rounded-lg object-cover"
          src={preview.url}
        />
      )) ||
        (preview?.fileType?.startsWith('video') && (
          <video
            className="w-full rounded-lg object-cover"
            controls
            src={preview.url}
          />
        ))}
    </>
  )
}
