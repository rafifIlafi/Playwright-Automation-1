'use client'

import { useEffect, useState, useCallback } from 'react'
import { GraduationCap, LogOut, Menu, X, Newspaper, Image as ImageIcon, Users, LayoutDashboard, Plus, Edit2, Trash2, Loader2, Settings, UserCog, FileText, BarChart3 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Berita {
  id: string
  judul: string
  isi: string
  gambar?: string
  createdAt: string
}

interface Galeri {
  id: string
  judul: string
  gambar: string
  createdAt: string
}

interface User {
  id: string
  username: string
  role: string
  createdAt: string
  updatedAt: string
}

interface Stats {
  beritaCount: number
  galeriCount: number
}

type TabType = 'dashboard' | 'berita' | 'dokumen-kegiatan' | 'galeri' | 'users'

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [stats, setStats] = useState<Stats>({ beritaCount: 0, galeriCount: 0 })
  const [beritaList, setBeritaList] = useState<Berita[]>([])
  const [galeriList, setGaleriList] = useState<Galeri[]>([])
  const [usersList, setUsersList] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

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

  const fetchStats = useCallback(async () => {
    const [beritaRes, galeriRes] = await Promise.all([
      fetch('/api/berita'),
      fetch('/api/galeri')
    ])
    const beritaData = await beritaRes.json()
    const galeriData = await galeriRes.json()
    setStats({
      beritaCount: beritaData.length || 0,
      galeriCount: galeriData.length || 0
    })
    setLoading(false)
  }, [])

  const fetchBerita = useCallback(async () => {
    const response = await fetch('/api/berita')
    const data = await response.json()
    setBeritaList(data)
  }, [])

  const fetchGaleri = useCallback(async () => {
    const response = await fetch('/api/galeri')
    const data = await response.json()
    setGaleriList(data)
  }, [])

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }, [router])

  const navigateToTab = useCallback((tab: TabType) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
    const query = tab === 'dashboard' ? '' : `?tab=${tab}`
    router.push(`/admin/dashboard${query}`)
  }, [router])

  const deleteBerita = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this berita?')) return
    await fetch(`/api/berita/${id}`, { method: 'DELETE' })
    fetchBerita()
    fetchStats()
  }, [fetchBerita, fetchStats])

  const deleteGaleri = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this galeri item?')) return
    await fetch(`/api/galeri/${id}`, { method: 'DELETE' })
    fetchGaleri()
    fetchStats()
  }, [fetchGaleri, fetchStats])

  const fetchUsers = useCallback(async () => {
    const response = await fetch('/api/users')
    const data = await response.json()
    setUsersList(data)
  }, [])

  const deleteUser = useCallback(async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return
    const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
    if (response.ok) {
      fetchUsers()
    }
  }, [fetchUsers])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'berita' || tabParam === 'dokumen-kegiatan' || tabParam === 'galeri' || tabParam === 'users') {
      setActiveTab(tabParam as TabType)
    } else {
      setActiveTab('dashboard')
    }
  }, [searchParams])

  useEffect(() => {
    if (user) {
      fetchStats()
      if (activeTab === 'berita') fetchBerita()
      if (activeTab === 'galeri') fetchGaleri()
      if (activeTab === 'users') fetchUsers()
    }
  }, [user, activeTab, fetchStats, fetchBerita, fetchGaleri, fetchUsers])

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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-blue-900" />
                <div>
                  <h1 className="text-lg font-bold">SMK PGRI Wonoasri</h1>
                  <p className="text-xs text-foreground/60">Admin Panel</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-foreground/60">
                Welcome, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-border pt-20 transform transition-transform md:translate-x-0 md:static md:pt-0`}
        >
          <nav className="p-4 space-y-2">
            <button
              onClick={() => navigateToTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-900 text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
            <Link
              href="/admin/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-muted"
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>
            <button
              onClick={() => navigateToTab('berita')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'berita'
                  ? 'bg-blue-900 text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <Newspaper size={20} />
              <span>Berita</span>
            </button>
            <Link
              href="/admin/dokumen-kegiatan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-muted"
            >
              <FileText size={20} />
              <span>Dokumen Kegiatan</span>
            </Link>
            <button
              onClick={() => navigateToTab('galeri')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'galeri'
                  ? 'bg-blue-900 text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <ImageIcon size={20} />
              <span>Galeri</span>
            </button>
            <div className="border-t border-border my-2" />
            <Link
              href="/admin/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-muted"
            >
              <Settings size={20} />
              <span>Setting</span>
            </Link>
            <button
              onClick={() => navigateToTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'users'
                  ? 'bg-yellow-500 text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <UserCog size={20} />
              <span>User Management</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 mb-1">Total Berita</p>
                      <p className="text-4xl font-bold">{stats.beritaCount}</p>
                    </div>
                    <Newspaper size={48} className="text-white/20" />
                  </div>
                  <button
                    onClick={() => navigateToTab('berita')}
                    className="inline-flex items-center gap-2 mt-4 text-white/90 hover:text-yellow-400 transition-colors"
                  >
                    Lihat Semua →
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 mb-1">Total Galeri</p>
                      <p className="text-4xl font-bold">{stats.galeriCount}</p>
                    </div>
                    <ImageIcon size={48} className="text-white/20" />
                  </div>
                  <button
                    onClick={() => navigateToTab('galeri')}
                    className="inline-flex items-center gap-2 mt-4 text-white/90 hover:text-yellow-400 transition-colors"
                  >
                    Lihat Semua →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Berita Tab */}
          {activeTab === 'berita' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-bold">Manage Berita</h2>
                <Link
                  href="/admin/berita/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors"
                >
                  <Plus size={20} />
                  <span>Tambah Berita</span>
                </Link>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {beritaList.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-8 text-center text-foreground/60">
                            No berita found. Create your first one!
                          </td>
                        </tr>
                      ) : (
                        beritaList.map((berita) => (
                          <tr key={berita.id} className="hover:bg-muted/50">
                            <td className="px-6 py-4">
                              <div className="font-medium line-clamp-1">{berita.judul}</div>
                              <div className="text-sm text-foreground/60 line-clamp-1">{berita.isi}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-foreground/60 hidden md:table-cell">
                              {new Date(berita.createdAt).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/admin/berita/${berita.id}`}
                                  className="p-2 hover:bg-blue-900/10 rounded-lg transition-colors text-blue-900"
                                  title="Edit"
                                >
                                  <Edit2 size={18} />
                                </Link>
                                <button
                                  onClick={() => deleteBerita(berita.id)}
                                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Galeri Tab */}
          {activeTab === 'galeri' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-bold">Manage Galeri</h2>
                <Link
                  href="/admin/galeri/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors"
                >
                  <Plus size={20} />
                  <span>Tambah Galeri</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galeriList.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-foreground/60">
                    Galeri masih kosong. Tambahkan item galeri baru sekarang!
                  </div>
                ) : (
                  galeriList.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden group">
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        {item.gambar ? (
                          <img
                            src={item.gambar}
                            alt={item.judul}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-foreground/20" />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium line-clamp-1 mb-2">{item.judul}</h3>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/galeri/${item.id}`}
                            className="flex-1 p-2 bg-blue-900/10 text-blue-900 rounded-lg hover:bg-blue-900/20 transition-colors text-center text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteGaleri(item.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-bold">Manajemen User</h2>
                <Link
                  href="/admin/users/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                >
                  <Plus size={20} />
                  <span>Tambah User</span>
                </Link>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Username</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Created At</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {usersList.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-foreground/60">
                            Belum ada user. Tambah user baru sekarang!
                          </td>
                        </tr>
                      ) : (
                        usersList.map((userItem) => (
                          <tr key={userItem.id} className="hover:bg-muted/50">
                            <td className="px-6 py-4">
                              <div className="font-medium">{userItem.username}</div>
                              <div className="text-sm text-foreground/60">{userItem.id}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                userItem.role === 'admin'
                                  ? 'bg-blue-100 text-blue-800'
                                  : userItem.role === 'editor'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {userItem.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-foreground/60 hidden md:table-cell">
                              {new Date(userItem.createdAt).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => deleteUser(userItem.id)}
                                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
                                  title="Hapus"
                                  disabled={usersList.length <= 1}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
