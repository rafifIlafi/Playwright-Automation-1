'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, ArrowLeft, Save, Upload, X, Loader2 } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditBerita() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [gambar, setGambar] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
      setJudul(data.judul)
      setIsi(data.isi)
      setGambar(data.gambar || '')
    } catch (err) {
      setError('Failed to load berita')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB')
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, and WebP files are allowed')
      return
    }

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'berita')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Gagal Uploud')
      }

      setGambar(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal memuat gambar')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!judul || !isi) {
      setError('Judul and isi are required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/berita/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ judul, isi, gambar }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update berita')
      }

      router.push('/admin/berita')
    } catch (err: any) {
      setError(err.message || 'Failed to update berita')
      setSaving(false)
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Edit Berita</h2>
          <p className="text-foreground/60">Update berita information</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium mb-2">Judul *</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="Enter berita title"
              required
            />
          </div>

          {/* Isi */}
          <div>
            <label className="block text-sm font-medium mb-2">Isi *</label>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-y"
              placeholder="Enter berita content"
              required
            />
          </div>

          {/* Gambar Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Gambar</label>
            <div className="space-y-4">
              {gambar ? (
                <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                  <img src={gambar} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setGambar('')}
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <Upload className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
                  <p className="text-foreground/60 mb-4">
                    Drag and drop an image, or click to select
                  </p>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        <span>Choose Image</span>
                      </>
                    )}
                  </label>
                </div>
              )}
              <p className="text-sm text-foreground/60">
                Max file size: 2MB. Allowed formats: JPG, PNG, WebP
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Update Berita</span>
                </>
              )}
            </button>
            <Link
              href="/admin/berita"
              className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors font-medium"
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
