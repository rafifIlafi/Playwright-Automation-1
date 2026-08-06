'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, ArrowLeft, Edit, Calendar, User, Eye } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ViewBerita() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [berita, setBerita] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBerita()
  }, [id])

  const fetchBerita = async () => {
    try {
      const response = await fetch(`/api/berita/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch berita')
      }
      const data = await response.json()
      setBerita(data)
    } catch (err) {
      console.error('Error fetching berita:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!berita) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Berita tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/admin/berita" className="text-foreground/60 hover:text-foreground transition-colors">
                <ArrowLeft size={24} />
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-lg font-bold">SMK PGRI Wonoasri</h1>
                  <p className="text-xs text-foreground/60">Admin Panel</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/berita/${berita.id}/edit`}>
                <Button variant="outline" className="gap-2">
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <CardTitle className="text-2xl md:text-3xl">{berita.judul}</CardTitle>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Dibuat: {formatDate(berita.createdAt)}</span>
                </div>
                {berita.updatedAt !== berita.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Diupdate: {formatDate(berita.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {berita.gambar && (
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-6">
                <img
                  src={berita.gambar}
                  alt={berita.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{berita.isi}</div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center gap-4">
          <Link href="/admin/berita">
            <Button variant="outline">
              Kembali ke Daftar
            </Button>
          </Link>
          <Link href={`/admin/berita/${berita.id}/edit`}>
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Berita
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
