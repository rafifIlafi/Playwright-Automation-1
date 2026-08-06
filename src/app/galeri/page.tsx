'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Calendar, Image as ImageIcon, Loader2, ArrowLeft, Maximize2 } from 'lucide-react'
import Link from 'next/link'

interface Galeri {
  id: string
  judul: string
  gambar: string
  createdAt: string
  updatedAt: string
}

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<Galeri[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/galeri')
        if (response.ok) {
          const data = await response.json()
          setGaleriList(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to fetch galeri:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGaleri()
  }, [])

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedImage((prev) => {
      if (prev === null) return null
      return prev === 0 ? galeriList.length - 1 : prev - 1
    })
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedImage((prev) => {
      if (prev === null) return null
      return prev === galeriList.length - 1 ? 0 : prev + 1
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isLightboxOpen) return

    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      goToPrevious(e as any)
    } else if (e.key === 'ArrowRight') {
      goToNext(e as any)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isLightboxOpen, galeriList.length])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-6 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Galeri Kegiatan</h1>
          <p className="text-base sm:text-lg text-blue-200 max-w-2xl">
            Dokumentasi berbagai kegiatan dan prestasi siswa SMK PGRI Wonoasri
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {galeriList.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center">
              <ImageIcon className="w-20 h-20 text-blue-900/50 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-3">Belum Ada Galeri</h2>
              <p className="text-foreground/60">Belum ada galeri yang ditambahkan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {galeriList.map((galeri, index) => (
                <div
                  key={galeri.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1"
                >
                  <img
                    src={galeri.gambar}
                    alt={galeri.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium text-sm sm:text-base line-clamp-2">
                        {galeri.judul}
                      </p>
                      <div className="flex items-center gap-2 text-white/80 text-xs mt-2">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(galeri.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-foreground" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lightbox */}
          {isLightboxOpen && selectedImage !== null && galeriList[selectedImage] && (
            <div
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <button
                onClick={goToPrevious}
                className="absolute left-4 sm:left-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 sm:right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>

              <div className="max-w-5xl max-h-[80vh] px-4" onClick={(e) => e.stopPropagation()}>
                <img
                  src={galeriList[selectedImage].gambar}
                  alt={galeriList[selectedImage].judul}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">
                    {galeriList[selectedImage].judul}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(galeriList[selectedImage].createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    {selectedImage + 1} dari {galeriList.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
