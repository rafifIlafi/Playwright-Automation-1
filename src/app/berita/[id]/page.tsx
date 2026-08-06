'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Share2, ArrowLeft, User, Image as ImageIcon, Home } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

interface Berita {
  id: string
  judul: string
  isi: string
  gambar: string
  createdAt: string
  updatedAt: string
}

export default function BeritaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [berita, setBerita] = useState<Berita | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (params.id && isClient) {
      fetchBerita()
    }
  }, [params.id, isClient])

  const fetchBerita = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/berita/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) {
          setError('Berita tidak ditemukan')
        } else {
          setError('Gagal memuat berita')
        }
        return
      }
      const data = await response.json()
      setBerita(data)
    } catch (error) {
      console.error('Error fetching berita:', error)
      setError('Terjadi kesalahan saat memuat berita')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && berita) {
      try {
        await navigator.share({
          title: berita.judul,
          text: stripHtml(berita.isi).substring(0, 200) + '...',
          url: window.location.href
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  // Inject custom styles for blog content
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .blog-content {
        line-height: 1.8;
      }
      .blog-content h1,
      .blog-content h2,
      .blog-content h3,
      .blog-content h4,
      .blog-content h5,
      .blog-content h6 {
        font-weight: 700;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        color: inherit;
      }
      .blog-content h1 { font-size: 2em; }
      .blog-content h2 { font-size: 1.75em; }
      .blog-content h3 { font-size: 1.5em; }
      .blog-content p {
        margin-bottom: 1em;
      }
      .blog-content ul,
      .blog-content ol {
        margin-bottom: 1em;
        padding-left: 1.5em;
      }
      .blog-content li {
        margin-bottom: 0.5em;
      }
      .blog-content a {
        color: #1e40af;
        text-decoration: underline;
      }
      .dark .blog-content a {
        color: #60a5fa;
      }
      .blog-content img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1em 0;
      }
      .blog-content blockquote {
        border-left: 4px solid #1e40af;
        padding-left: 1em;
        font-style: italic;
        color: #6b7280;
      }
      .dark .blog-content blockquote {
        border-left-color: #60a5fa;
        color: #9ca3af;
      }
      .blog-content strong,
      .blog-content b {
        font-weight: 700;
      }
      .blog-content code {
        background-color: #f3f4f6;
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-size: 0.875em;
      }
      .dark .blog-content code {
        background-color: #374151;
      }
      .blog-content pre {
        background-color: #f3f4f6;
        padding: 1em;
        border-radius: 8px;
        overflow-x: auto;
      }
      .dark .blog-content pre {
        background-color: #1f2937;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-96 w-full mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-96 w-full mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !berita) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {error || 'Maaf, berita yang Anda cari tidak dapat ditemukan atau telah dihapus.'}
          </p>
          <Link href="/berita">
            <Button className="bg-blue-900 hover:bg-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Berita
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb & Back Button */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/berita">
                <Button variant="ghost" className="gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Daftar Berita
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="gap-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                  <Home className="w-4 h-4" />
                  Beranda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(berita.createdAt)}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {berita.judul}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Diposting pada {formatDate(berita.createdAt)}</span>
              </div>
              {berita.updatedAt !== berita.createdAt && (
                <div className="flex items-center gap-2">
                  <span>•</span>
                  <span>Diperbarui pada {formatDate(berita.updatedAt)}</span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {berita.gambar && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Share Button */}
          <div className="mb-8 flex justify-end">
            <Button
              onClick={handleShare}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Bagikan Berita
            </Button>
          </div>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: berita.isi }}
              className="blog-content"
            />
          </div>

          <Separator className="my-12" />

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Terima kasih telah membaca berita ini
            </div>
            <div className="flex gap-3">
              <Link href="/berita">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Berita Lainnya
                </Button>
              </Link>
              <Button
                onClick={handleShare}
                className="bg-blue-900 hover:bg-blue-800 gap-2"
              >
                <Share2 className="w-4 h-4" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
