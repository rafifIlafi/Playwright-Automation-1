'use client'

import { useState } from 'react'
import { GraduationCap, ArrowLeft, Save, User, Shield, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewUser() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!username || !password) {
      setError('Username dan password wajib diisi')
      return
    }

    if (password !== confirmPassword) {
      setError('Password tidak cocok')
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat user')
      }

      router.push('/admin/dashboard?tab=users')
    } catch (err: any) {
      setError(err.message || 'Gagal membuat user')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard?tab=users" className="text-foreground/60 hover:text-foreground transition-colors">
                <ArrowLeft size={24} />
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-blue-900" />
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
          <h2 className="text-3xl font-bold mb-2">Tambah User Baru</h2>
          <p className="text-foreground/60">Buat akun user baru untuk akses admin panel</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">Username *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password *</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                placeholder="Masukkan password"
                required
              />
            </div>
            <p className="text-sm text-foreground/60 mt-1">Minimal 6 karakter</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Konfirmasi Password *</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                placeholder="Ulangi password"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Role *</label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none appearance-none bg-background"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Simpan User</span>
                </>
              )}
            </button>
            <Link
              href="/admin/dashboard?tab=users"
              className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors font-medium"
            >
              Batal
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
