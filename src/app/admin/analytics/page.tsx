'use client'

import { useEffect, useState, useCallback } from 'react'
import { GraduationCap, LogOut, Menu, X, LayoutDashboard, Loader2, Users, Eye, MousePointerClick, TrendingUp, Calendar, Activity, ArrowRight, BarChart3, FileX, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AnalyticsData {
  visitors: {
    totalVisits: number
    todayVisits: number
    weekVisits: number
    monthVisits: number
    uniqueVisitors: number
    dailyVisits: Array<{ date: string; count: number }>
  }
  userLogs: {
    totalLogs: number
    todayLogs: number
    weekLogs: number
    monthLogs: number
    uniqueUsers: number
    topActions: Array<{ action: string; count: number }>
    topUsers: Array<{ user: { username: string; role: string } | null; count: number }>
    dailyLogs: Array<{ date: string; count: number }>
  }
  clicks: {
    totalClicks: number
    todayClicks: number
    weekClicks: number
    monthClicks: number
    loggedClicks: number
    anonymousClicks: number
    clicksByContentType: Array<{ contentType: string; count: number }>
    mostClicked: Array<{ contentName: string; contentType: string; count: number }>
    dailyClicks: Array<{ date: string; count: number }>
  }
}

export default function AnalyticsDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  const fetchAnalytics = useCallback(async () => {
    try {
      const [visitorRes, userLogsRes, clicksRes] = await Promise.all([
        fetch('/api/visitor'),
        fetch('/api/user-logs/stats'),
        fetch('/api/track-click'),
      ])

      const visitorData = await visitorRes.json()
      const userLogsData = await userLogsRes.json()
      const clicksData = await clicksRes.json()

      // Set analytics with available data even if some fail
      setAnalytics({
        visitors: visitorData.success ? visitorData.data : {
          totalVisits: 0,
          todayVisits: 0,
          weekVisits: 0,
          monthVisits: 0,
          uniqueVisitors: 0,
          dailyVisits: []
        },
        userLogs: userLogsData.success ? userLogsData.data : {
          totalLogs: 0,
          todayLogs: 0,
          weekLogs: 0,
          monthLogs: 0,
          uniqueUsers: 0,
          topActions: [],
          topUsers: [],
          dailyLogs: []
        },
        clicks: clicksData.success ? clicksData.data : {
          totalClicks: 0,
          todayClicks: 0,
          weekClicks: 0,
          monthClicks: 0,
          loggedClicks: 0,
          anonymousClicks: 0,
          clicksByContentType: [],
          mostClicked: [],
          dailyClicks: []
        },
      })

      // Set error if any API failed
      const errors: string[] = []
      if (!visitorData.success) errors.push('Visitor data')
      if (!userLogsData.success) errors.push('User activity')
      if (!clicksData.success) errors.push('Click analytics')
      if (errors.length > 0) {
          setError(`Gagal memuat: ${errors.join(', ')}`)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setError('Failed to load analytics data')
      
      // Set empty analytics to avoid blank page
      setAnalytics({
        visitors: {
          totalVisits: 0,
          todayVisits: 0,
          weekVisits: 0,
          monthVisits: 0,
          uniqueVisitors: 0,
          dailyVisits: []
        },
        userLogs: {
          totalLogs: 0,
          todayLogs: 0,
          weekLogs: 0,
          monthLogs: 0,
          uniqueUsers: 0,
          topActions: [],
          topUsers: [],
          dailyLogs: []
        },
        clicks: {
          totalClicks: 0,
          todayClicks: 0,
          weekClicks: 0,
          monthClicks: 0,
          loggedClicks: 0,
          anonymousClicks: 0,
          clicksByContentType: [],
          mostClicked: [],
          dailyClicks: []
        },
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAnalytics()
    } else if (user) {
      setError('Access denied. Only admin can view analytics.')
      setLoading(false)
    }
  }, [user, fetchAnalytics])

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    // Don't block the view, just show error at the top
    console.error('Analytics error:', error)
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading analytics...</p>
        </div>
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
                  <p className="text-xs text-foreground/60">Analytics Dashboard</p>
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
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-muted"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors bg-blue-900 text-white"
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>
            <Link
              href="/admin/berita"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-muted"
            >
              <span>Berita</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-8">
            {/* Error Banner */}
            {error && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-3xl font-bold">Ringkasan Performa</h2>
              <button
                onClick={fetchAnalytics}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <RefreshCw size={20} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Eye size={24} />
                  </div>
                  <span className="text-xs text-blue-200 bg-blue-900/50 px-2 py-1 rounded-full">
                    Total
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{analytics.visitors.totalVisits}</p>
                <p className="text-blue-200 text-sm">Total Pengunjung</p>
                <p className="text-blue-300 text-xs mt-2">
                  {analytics.visitors.todayVisits} today
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Users size={24} />
                  </div>
                  <span className="text-xs text-green-200 bg-green-800/50 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{analytics.userLogs.uniqueUsers}</p>
                <p className="text-green-200 text-sm">Aktivitas Pengguna

                </p>
                <p className="text-green-300 text-xs mt-2">
                  {analytics.userLogs.todayLogs} actions today
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <MousePointerClick size={24} />
                  </div>
                  <span className="text-xs text-purple-200 bg-purple-800/50 px-2 py-1 rounded-full">
                    Interactions
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{analytics.clicks.totalClicks}</p>
                <p className="text-purple-200 text-sm">Total Klik</p>
                <p className="text-purple-300 text-xs mt-2">
                  {analytics.clicks.todayClicks} today
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-xs text-yellow-200 bg-yellow-700/50 px-2 py-1 rounded-full">
                    Trend
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{analytics.visitors.weekVisits}</p>
                <p className="text-yellow-200 text-sm">Pengunjung Mingguan</p>
                <p className="text-yellow-300 text-xs mt-2">
                  {analytics.clicks.weekClicks} clicks this week
                </p>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Visitor Activity */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Eye size={20} className="text-blue-900" />
                  Visitor Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Total Pengunjung</span>
                    <span className="font-bold text-blue-900">{analytics.visitors.totalVisits}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Pengunjung Unik</span>
                    <span className="font-bold text-blue-900">{analytics.visitors.uniqueVisitors}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Hari Ini</span>
                    <span className="font-bold text-green-600">{analytics.visitors.todayVisits}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Minggu Ini</span>
                    <span className="font-bold text-yellow-600">{analytics.visitors.weekVisits}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Bulan Ini</span>
                    <span className="font-bold text-purple-600">{analytics.visitors.monthVisits}</span>
                  </div>
                </div>
              </div>

              {/* User Activity */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users size={20} className="text-green-600" />
                  User Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Aktivitas Pengguna</span>
                    <span className="font-bold text-green-600">{analytics.userLogs.uniqueUsers}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Total Aksi</span>
                    <span className="font-bold text-blue-900">{analytics.userLogs.totalLogs}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Hari Ini</span>
                    <span className="font-bold text-green-600">{analytics.userLogs.todayLogs}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Minggu Ini</span>
                    <span className="font-bold text-yellow-600">{analytics.userLogs.weekLogs}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Bulan Ini</span>
                    <span className="font-bold text-purple-600">{analytics.userLogs.monthLogs}</span>
                  </div>
                </div>
              </div>

              {/* Click Analytics */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MousePointerClick size={20} className="text-purple-600" />
                  Click Analytics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Total Klik</span>
                    <span className="font-bold text-purple-600">{analytics.clicks.totalClicks}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Pengguna Masuk</span>
                    <span className="font-bold text-blue-900">{analytics.clicks.loggedClicks}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Pengunjung Anonim</span>
                    <span className="font-bold text-gray-600">{analytics.clicks.anonymousClicks}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Hari Ini</span>
                    <span className="font-bold text-green-600">{analytics.clicks.todayClicks}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Minggu Ini</span>
                    <span className="font-bold text-yellow-600">{analytics.clicks.weekClicks}</span>
                  </div>
                </div>
              </div>
            </div>

            {/*Berdasarkan Jenis Konten */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-900" />
                 Berdasarkan Jenis Konten
              </h3>
              {analytics.clicks.clicksByContentType.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-foreground/60">
                  <FileX className="w-12 h-12 mb-2" />
                  <p>Belum ada data klik</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {analytics.clicks.clicksByContentType.map((item) => (
                    <div
                      key={item.contentType}
                      className="p-4 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 rounded-xl border border-blue-100 dark:border-blue-800"
                    >
                      <p className="text-xs text-foreground/60 mb-1">{item.contentType}</p>
                      <p className="text-2xl font-bold text-blue-900">{item.count}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Konten Paling Banyak Diklik */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-yellow-600" />
                Konten Paling Banyak Diklik
              </h3>
              {analytics.clicks.mostClicked.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-foreground/60">
                  <FileX className="w-12 h-12 mb-2" />
                  <p>Belum ada data klik</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analytics.clicks.mostClicked.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.contentName}</p>
                          <p className="text-xs text-foreground/60">{item.contentType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-900">{item.count}</span>
                        <span className="text-xs text-foreground/60">clicks</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Aktivitas Pengguna */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users size={20} className="text-green-600" />
                Top Aktivitas Pengguna
              </h3>
              {analytics.userLogs.topUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-foreground/60">
                  <FileX className="w-12 h-12 mb-2" />
                  <p>Belum ada data user</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analytics.userLogs.topUsers.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.user?.username || 'Unknown'}</p>
                          <p className="text-xs text-foreground/60">{item.user?.role || 'Unknown'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">{item.count}</span>
                        <span className="text-xs text-foreground/60">actions</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Aktivitas Pengguna Terbanyak */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Activity size={20} className="text-blue-900" />
                Aktivitas Pengguna Terbanyak
              </h3>
              {analytics.userLogs.topActions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-foreground/60">
                  <FileX className="w-12 h-12 mb-2" />
                  <p>Belum ada data aksi</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {analytics.userLogs.topActions.map((item) => (
                    <div
                      key={item.action}
                      className="p-4 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-800 rounded-xl border border-green-100 dark:border-green-800"
                    >
                      <p className="text-xs text-foreground/60 mb-1">{item.action}</p>
                      <p className="text-2xl font-bold text-green-600">{item.count}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
