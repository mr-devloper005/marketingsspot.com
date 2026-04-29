'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'

export function PhotosLightbox({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (!images.length) return null

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative h-40 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition hover:opacity-90"
          >
            <ContentImage src={image} alt={`${title} photo ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-2 text-slate-900 shadow-lg"
              aria-label="Close photos popup"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[72vh] overflow-hidden rounded-2xl border border-white/20 bg-slate-900">
              <ContentImage
                src={images[activeIndex]}
                alt={`${title} photo ${activeIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
