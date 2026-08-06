'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, FileText, LogOut, Loader2, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Berita {
  id: string
  judul: string
  isi: string
  gambar: string | null
  createdAt: string
  updatedAt: string
}

export default function BeritaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [beritaList, setBeritaList] = useState<Berita[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        router.push('/admin')
        return
      }
      const data = await response.json()
      setUser(data.user)
    } catch (error) {
      router.push('/admin')
    }
  }, [router])

  const fetchBerita = useCallback(async () => {
    try {
      const response = await fetch('/api/berita')
      if (response.ok) {
        const data = await response.json()
        setBeritaList(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching berita:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat data berita',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    checkAuth()
    fetchBerita()
  }, [checkAuth, fetchBerita])

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      return
    }

    setDeletingId(id)

    try {
      const response = await fetch(`/api/berita/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      toast({
        title: 'Berhasil',
        description: 'Berita berhasil dihapus',
        variant: 'default',
      })

      setIsModalOpen(false)
      setDeletingId(null)
      fetchBerita()
    } catch (error) {
      console.error('Error deleting berita:', error)
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus berita',
        variant: 'destructive',
      })
      setDeletingId(null)
    }
  }

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-blue-900" />
                <div>
                  <h1 className="text-lg font-bold hidden sm:block">Berita</h1>
                  <p className="text-xs text-foreground/60">Kelola Berita</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/berita/new"
                className="bg-blue-900 hover:bg-blue-800 text-white gap-2 px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Tambah Berita</span>
                <span className="sm:hidden">Tambah</span>
              </Link>
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Card */}
          <div className="mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Berita</CardDescription>
                <CardTitle className="text-3xl">{beritaList.length}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Berita List */}
          <div className="space-y-4">
            {beritaList.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Berita</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Belum ada berita yang ditambahkan.
                  </p>
                  <Link
                    href="/admin/berita/new"
                    className="bg-blue-900 hover:bg-blue-800 text-white gap-2 px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Berita Pertama
                  </Link>
                </CardContent>
              </Card>
            ) : (
              beritaList.map((berita) => (
                <Card key={berita.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{berita.judul}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(berita.createdAt)}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {truncateText(berita.isi, 150)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/berita/${berita.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Lihat</span>
                        </Link>
                        <Link
                          href={`/admin/berita/${berita.id}/edit`}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>
                        <Button
                          onClick={() => {
                            setDeletingId(berita.id)
                            setIsModalOpen(true)
                          }}
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Hapus</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {berita.gambar && (
                    <CardContent>
                      <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                        <img
                          src={berita.gambar}
                          alt={berita.judul}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setDeletingId(null)
              }}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletingId && handleDelete(deletingId)}
              disabled={!deletingId}
            >
              {deletingId ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
