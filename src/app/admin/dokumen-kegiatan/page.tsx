'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, FileText, FileText as FilePdf, Download, Upload, X as XIcon, CheckCircle, AlertCircle, Loader2, Eye, EyeOff, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area'

interface DokumenKegiatan {
  id: string
  judulKegiatan: string
  deskripsi: string
  fileJuklak: string | null
  fileJuknis: string | null
  status: boolean
  createdAt: string
  updatedAt: string
}

export default function DokumenKegiatanPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [dokumenList, setDokumenList] = useState<DokumenKegiatan[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDokumen, setEditingDokumen] = useState<DokumenKegiatan | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [uploadingFile, setUploadingFile] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    judulKegiatan: '',
    deskripsi: '',
    fileJuklak: '',
    fileJuknis: '',
    status: false
  })

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

  const fetchDokumen = useCallback(async () => {
    try {
      const response = await fetch('/api/dokumen-kegiatan')
      if (response.ok) {
        const data = await response.json()
        setDokumenList(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching dokumen:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat data dokumen kegiatan',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    checkAuth()
    fetchDokumen()
  }, [checkAuth, fetchDokumen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value === 'true' }))
  }

  const handleFileUpload = async (field: string, file: File) => {
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Error',
        description: 'Hanya file PDF yang diperbolehkan',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Ukuran file maksimal 5MB',
        variant: 'destructive',
      })
      return
    }

    setUploadingFile(field)
    setUploadProgress(prev => ({ ...prev, [field]: 0 }))

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'dokumen')

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[field] || 0
          if (current < 90) {
            return { ...prev, [field]: current + 10 }
          }
          return prev
        })
      }, 100)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal Uploud')
      }

      const data = await response.json()
      setFormData(prev => ({ ...prev, [field]: data.url }))
      setUploadProgress(prev => ({ ...prev, [field]: 100 }))

      toast({
        title: 'Berhasil',
        description: 'File berhasil diunggah',
        variant: 'default',
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        title: 'Gagal',
        description: error.message || 'Gagal mengunggah file',
        variant: 'destructive',
      })
      setUploadProgress(prev => ({ ...prev, [field]: 0 }))
    } finally {
      setUploadingFile(null)
      setTimeout(() => {
        setUploadProgress(prev => ({ ...prev, [field]: 0 }))
      }, 1000)
    }
  }

  const handleRemoveFile = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: '' }))
  }

  const resetForm = () => {
    setFormData({
      judulKegiatan: '',
      deskripsi: '',
      fileJuklak: '',
      fileJuknis: '',
      status: false
    })
    setEditingDokumen(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingDokumen
        ? `/api/dokumen-kegiatan/${editingDokumen.id}`
        : '/api/dokumen-kegiatan'

      const method = editingDokumen ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save')
      }

      toast({
        title: 'Berhasil',
        description: editingDokumen
          ? 'Dokumen kegiatan berhasil diperbarui'
          : 'Dokumen kegiatan berhasil ditambahkan',
        variant: 'default',
      })

      setIsModalOpen(false)
      resetForm()
      fetchDokumen()
    } catch (error) {
      console.error('Error saving dokumen:', error)
      toast({
        title: 'Gagal',
        description: 'Gagal menyimpan dokumen kegiatan',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (dokumen: DokumenKegiatan) => {
    setEditingDokumen(dokumen)
    setFormData({
      judulKegiatan: dokumen.judulKegiatan,
      deskripsi: dokumen.deskripsi,
      fileJuklak: dokumen.fileJuklak || '',
      fileJuknis: dokumen.fileJuknis || '',
      status: dokumen.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus dokumen kegiatan ini?')) {
      return
    }

    try {
      const response = await fetch(`/api/dokumen-kegiatan/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      toast({
        title: 'Berhasil',
        description: 'Dokumen kegiatan berhasil dihapus',
        variant: 'default',
      })

      fetchDokumen()
    } catch (error) {
      console.error('Error deleting dokumen:', error)
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus dokumen kegiatan',
        variant: 'destructive',
      })
    }
  }

  const handleToggleStatus = async (dokumen: DokumenKegiatan) => {
    try {
      const response = await fetch(`/api/dokumen-kegiatan/${dokumen.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: !dokumen.status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      toast({
        title: 'Berhasil',
        description: `Status ${dokumen.judulKegiatan} berhasil diubah`,
        variant: 'default',
      })

      fetchDokumen()
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: 'Gagal',
        description: 'Gagal mengubah status',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-blue-900" />
                <div>
                  <h1 className="text-lg font-bold hidden sm:block">Dokumen Kegiatan</h1>
                  <p className="text-xs text-foreground/60">Kelola Dokumen Kegiatan</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => {
                  resetForm()
                  setIsModalOpen(true)
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Tambah Kegiatan</span>
                <span className="sm:hidden">Tambah</span>
              </Button>
              <Button
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' })
                  router.push('/admin')
                }}
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Kegiatan</CardDescription>
                <CardTitle className="text-3xl">{dokumenList.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Kegiatan Aktif</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {dokumenList.filter(d => d.status).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Kegiatan Nonaktif</CardDescription>
                <CardTitle className="text-3xl text-gray-500">
                  {dokumenList.filter(d => !d.status).length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Dokumen List */}
          <div className="space-y-4">
            {dokumenList.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Dokumen</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Belum ada dokumen kegiatan yang ditambahkan.
                  </p>
                  <Button
                    onClick={() => {
                      resetForm()
                      setIsModalOpen(true)
                    }}
                    className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Kegiatan Pertama
                  </Button>
                </CardContent>
              </Card>
            ) : (
              dokumenList.map((dokumen) => (
                <Card key={dokumen.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{dokumen.judulKegiatan}</CardTitle>
                          <Badge variant={dokumen.status ? 'default' : 'secondary'} className="bg-green-600 hover:bg-green-700">
                            {dokumen.status ? (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                Aktif
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 mr-1" />
                                Nonaktif
                              </>
                            )}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {dokumen.deskripsi}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleToggleStatus(dokumen)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          {dokumen.status ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              Nonaktifkan
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              Aktifkan
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleEdit(dokumen)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          onClick={() => handleDelete(dokumen.id)}
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
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {dokumen.fileJuklak && (
                        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FilePdf className="w-5 h-5 text-red-600" />
                            <div>
                              <p className="text-sm font-medium">Juklak</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {dokumen.fileJuklak.split('/').pop()}
                              </p>
                            </div>
                          </div>
                          <a
                            href={dokumen.fileJuklak}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md transition-colors"
                          >
                            <Download className="w-4 h-4 text-red-600" />
                          </a>
                        </div>
                      )}
                      {dokumen.fileJuknis && (
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FilePdf className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium">Juknis</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {dokumen.fileJuknis.split('/').pop()}
                              </p>
                            </div>
                          </div>
                          <a
                            href={dokumen.fileJuknis}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md transition-colors"
                          >
                            <Download className="w-4 h-4 text-blue-600" />
                          </a>
                        </div>
                      )}
                    </div>
                    {!dokumen.fileJuklak && !dokumen.fileJuknis && (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        Belum ada file yang diunggah
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDokumen ? 'Edit Dokumen Kegiatan' : 'Tambah Dokumen Kegiatan'}
            </DialogTitle>
            <DialogDescription>
              {editingDokumen
                ? 'Perbarui informasi dokumen kegiatan'
                : 'Tambahkan dokumen kegiatan baru'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="judulKegiatan">Judul Kegiatan *</Label>
                <Input
                  id="judulKegiatan"
                  name="judulKegiatan"
                  value={formData.judulKegiatan}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Kegiatan Ramadhan 1446H"
                />
              </div>

              <div>
                <Label htmlFor="deskripsi">Deskripsi *</Label>
                <Textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Jelaskan kegiatan ini secara singkat..."
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status ? 'true' : 'false'} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Nonaktif</SelectItem>
                    <SelectItem value="true">Aktif</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Hanya kegiatan dengan status "Aktif" yang akan ditampilkan di halaman depan
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>File Juklak (PDF, Max 5MB)</Label>
                  {formData.fileJuklak ? (
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg mt-2">
                      <div className="flex items-center gap-2">
                        <FilePdf className="w-5 h-5 text-red-600" />
                        <span className="text-sm truncate max-w-[200px]">
                          {formData.fileJuklak.split('/').pop()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={formData.fileJuklak}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md transition-colors"
                        >
                          <Download className="w-4 h-4 text-red-600" />
                        </a>
                        <Button
                          type="button"
                          onClick={() => handleRemoveFile('fileJuklak')}
                          variant="ghost"
                          size="sm"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload('fileJuklak', file)
                        }}
                        disabled={uploadingFile === 'fileJuklak'}
                      />
                      {uploadingFile === 'fileJuklak' && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Uploading...</span>
                            <span>{uploadProgress['fileJuklak']}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress['fileJuklak']}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Label>File Juknis (PDF, Max 5MB)</Label>
                  {formData.fileJuknis ? (
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-2">
                      <div className="flex items-center gap-2">
                        <FilePdf className="w-5 h-5 text-blue-600" />
                        <span className="text-sm truncate max-w-[200px]">
                          {formData.fileJuknis.split('/').pop()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={formData.fileJuknis}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md transition-colors"
                        >
                          <Download className="w-4 h-4 text-blue-600" />
                        </a>
                        <Button
                          type="button"
                          onClick={() => handleRemoveFile('fileJuknis')}
                          variant="ghost"
                          size="sm"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload('fileJuknis', file)
                        }}
                        disabled={uploadingFile === 'fileJuknis'}
                      />
                      {uploadingFile === 'fileJuknis' && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Uploading...</span>
                            <span>{uploadProgress['fileJuknis']}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress['fileJuknis']}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }}
                disabled={saving}
              >
                Batal
              </Button>
              <Button type="submit" disabled={saving} className="bg-blue-900 hover:bg-blue-800 text-white gap-2">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
