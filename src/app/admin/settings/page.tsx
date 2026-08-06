'use client'

import { useEffect, useState, useCallback } from 'react'
import { GraduationCap, LogOut, Menu, X, Settings, CheckCircle, AlertCircle, Loader2, Save, Building2, Target, BookOpen, Award, Users, Star, Phone, Globe, MapPin, Mail, BarChart3, Activity, FileText, Database, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Info, Shield, Eye, ScrollText, Globe2, Zap, GraduationCap as GraduationCapIcon, FolderOpen, Check, AlertTriangle, Upload, X as XIcon, ImagePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface SettingsData {
  [key: string]: string
}

interface ProgramContentData {
  id?: string
  programCode: string
  title: string
  description: string
  vision: string
  goals: string
  competencies: string
  subjects: string
  jobs: string
  majors: string
  partners: string
  facilities: string
  achievements: string
  certifications: string
  gallery: string
  testimonials: string
  gallery_1?: string
  gallery_2?: string
  gallery_3?: string
  gallery_4?: string
  gallery_5?: string
  gallery_6?: string
  gallery_7?: string
  gallery_8?: string
}

interface VisitorStats {
  totalVisits: number
  todayVisits: number
  monthVisits: number
}

interface UserLogEntry {
  id: string
  userId: string
  username?: string
  action: string
  details?: string
  createdAt: string
}

const programs = [
  { code: 'dkv', name: 'Desain Komunikasi Visual' },
  { code: 'tkj', name: 'Teknik Komputer & Jaringan' },
  { code: 'kc', name: 'Keperawatan' },
  { code: 'bdp', name: 'Bisnis Daring & Pemasaran' },
  { code: 'ak', name: 'Akuntansi' },
  { code: 'mplb', name: 'Manajemen Perkantoran & Layanan Bisnis' },
]

export default function AdminSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState<SettingsData>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('school-info')

  // Tab 10: Program Content state
  const [selectedProgram, setSelectedProgram] = useState<string>('')
  const [programContent, setProgramContent] = useState<ProgramContentData>({
    programCode: '',
    title: '',
    description: '',
    vision: '',
    goals: '',
    competencies: '',
    subjects: '',
    jobs: '',
    majors: '',
    partners: '',
    facilities: '',
    achievements: '',
    certifications: '',
    gallery: '',
    testimonials: '',
    gallery_1: '',
    gallery_2: '',
    gallery_3: '',
    gallery_4: '',
    gallery_5: '',
    gallery_6: '',
    gallery_7: '',
    gallery_8: '',
  })
  const [loadingProgram, setLoadingProgram] = useState(false)
  const [savingProgram, setSavingProgram] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  // Tab 11: Visitor Statistics state
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    totalVisits: 0,
    todayVisits: 0,
    monthVisits: 0,
  })
  const [loadingVisitor, setLoadingVisitor] = useState(false)

  // Tab 12: User Logs state
  const [userLogs, setUserLogs] = useState<UserLogEntry[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)
  const [logPage, setLogPage] = useState(1)
  const [logLimit] = useState(20)
  const [logUserFilter, setLogUserFilter] = useState('')

  // Default values
  const defaultSettings: SettingsData = {
    school_name: 'SMKS PGRI Wonoasri',
    school_accreditation: 'Terakreditasi A',
    school_address: 'Jl. Raya Wonoasri No. 123, Wonoasri, Madiun, Jawa Timur',
    school_phone: '085158333064',
    school_email: 'info@smkpgriwonoasri.sch.id',
    vision_text: 'Menjadi sekolah kejuruan unggulan yang menghasilkan lulusan kompeten, berkarakter, dan siap kerja berbasis teknologi dan nilai-nilai Pancasila.',
    mission_1: 'Menyelenggarakan pendidikan vokasi berkualitas yang relevan dengan kebutuhan industri dan perkembangan teknologi.',
    mission_2: 'Membentuk karakter peserta didik yang beriman, bertaqwa, jujur, disiplin, dan bertanggung jawab.',
    mission_3: 'Meningkatkan kompetensi peserta didik melalui pembelajaran praktik berbasis proyek dan kerja nyata.',
    mission_4: 'Membangun kemitraan strategis dengan dunia usaha dan dunia industri untuk penyerapan lulusan.',
    program_dkv_title: 'Desain Komunikasi Visual',
    program_dkv_desc: 'Mempelajari desain grafis, fotografi, videografi, animasi, dan multimedia untuk mencetak desainer kreatif.',
    program_tkj_title: 'Teknik Komputer & Jaringan',
    program_tkj_desc: 'Mempelajari jaringan komputer, server, keamanan jaringan, dan infrastruktur IT modern.',
    program_kc_title: 'Keperawatan',
    program_kc_desc: 'Mempelajari asuhan keperawatan, kesehatan, dan pelayanan medis dasar untuk tenaga kesehatan profesional.',
    program_bdp_title: 'Bisnis Daring & Pemasaran',
    program_bdp_desc: 'Mempelajari strategi pemasaran digital, e-commerce, manajemen bisnis online, dan entrepreneurship.',
    program_ak_title: 'Akuntansi',
    program_ak_desc: 'Mempelajari akuntansi keuangan, perpajakan, audit, dan manajemen keuangan perusahaan.',
    program_mplb_title: 'Manajemen Perkantoran & Layanan Bisnis',
    program_mplb_desc: 'Mempelajari administrasi perkantoran, kearsipan, dan pelayanan bisnis modern.',
    facility_1: 'Lab Komputer Modern dengan Software Terlengkap',
    facility_2: 'Lab Jaringan & Server Lengkap',
    facility_3: 'Studio Desain & Multimedia',
    facility_4: 'Lab Akuntansi dengan Software Zahir',
    facility_5: 'Perpustakaan Digital & Fisik',
    facility_6: 'Aula Serbaguna & Gedung Pertemuan',
    facility_7: 'Lapangan Olahraga & Sarana Prasarana Lengkap',
    facility_8: 'Masjid Sekolah yang Nyaman',
    ekstrakurikuler_1: 'Pramuka',
    ekstrakurikuler_2: 'Paskibra',
    ekstrakurikuler_3: 'PMR',
    ekstrakurikuler_4: 'Rohis',
    ekstrakurikuler_5: 'Futsal',
    ekstrakurikuler_6: 'Basket',
    ekstrakurikuler_7: 'Volley',
    ekstrakurikuler_8: 'Karya Ilmiah Remaja (KIR)',
    program_unggulan_title: 'Program Hybrid Learning',
    program_unggulan_desc: 'Program pembelajaran hibrida yang menggabungkan pembelajaran tatap muka dan online untuk fleksibilitas dan efektivitas.',
    feature_1: 'Pembelajaran Daring dengan Platform Modern',
    feature_2: 'Akses Materi 24/7 melalui Learning Management System',
    feature_3: 'Video Pembelajaran Berkualitas Tinggi',
    feature_4: 'Diskusi Online dengan Guru dan Teman',
    feature_5: 'Ujian Online dengan Sistem Monitoring',
    feature_6: 'Modul Digital yang Terstruktur',
    feature_7: 'Support Technical Team untuk Kendala IT',
    feature_8: 'Sertifikat Digital untuk Setiap Program',
    ppdb_tahap2_period: '1 Juni - 31 Juli 2025',
    ppdb_tahap2_benefit: 'Dapatkan diskon biaya pendaftaran 20% dan bonus seragam sekolah lengkap.',
    ppdb_tahap3_period: '1 Agustus - 15 September 2025',
    ppdb_tahap3_benefit: 'Pendaftaran terbuka untuk semua program keahlian dengan kuota terbatas.',
    scholarship_1: 'Beasiswa Prestasi Akademik',
    scholarship_2: 'Beasiswa Olahraga & Seni',
    scholarship_3: 'Beasiswa Tidak Mampu',
    contact_whatsapp: '085158333064',
    contact_tiktok: 'https://tiktok.com/@smkpgriwonoasri',
    contact_instagram: 'https://instagram.com/smks_pgri_wonoasri',
    contact_youtube: 'https://youtube.com/@smkpgriwonoasri',
    contact_maps: 'https://maps.google.com/embed?pb=...',
    footer_about: 'SMKS PGRI Wonoasri adalah sekolah kejuruan unggulan yang berkomitmen mencetak generasi berkarakter, kompeten, dan siap kerja.',
  }

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

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings({ ...defaultSettings, ...data })
      } else {
        setSettings(defaultSettings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setSettings(defaultSettings)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveSetting = useCallback(async (key: string, value: string) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      })
      if (!response.ok) throw new Error('Failed to save')
      return true
    } catch (error) {
      console.error('Error saving setting:', error)
      return false
    }
  }, [])

  const saveSection = useCallback(async (keys: string[]) => {
    setSaving(true)
    let successCount = 0
    let failedKeys: string[] = []

    for (const key of keys) {
      const success = await saveSetting(key, settings[key] || '')
      if (success) {
        successCount++
      } else {
        failedKeys.push(key)
      }
    }

    setSaving(false)

    if (failedKeys.length === 0) {
      toast({
        title: 'Berhasil',
        description: `${successCount} pengaturan berhasil disimpan.`,
        variant: 'default',
      })
    } else {
      toast({
        title: 'Sebagian Gagal',
        description: `${successCount} berhasil, ${failedKeys.length} gagal disimpan.`,
        variant: 'destructive',
      })
    }
  }, [settings, saveSetting, toast])

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  // Tab 10: Program Content functions
  const fetchProgramContent = useCallback(async (code: string) => {
    if (!code) return
    setLoadingProgram(true)
    try {
      const response = await fetch(`/api/program-content/${code}`)
      if (response.ok) {
        const data = await response.json()
        setProgramContent(data)
      } else {
        setProgramContent({
          programCode: code,
          title: '',
          description: '',
          vision: '',
          goals: '',
          competencies: '',
          subjects: '',
          jobs: '',
          majors: '',
          partners: '',
          facilities: '',
          achievements: '',
          certifications: '',
          gallery: '',
          testimonials: '',
          gallery_1: '',
          gallery_2: '',
          gallery_3: '',
          gallery_4: '',
          gallery_5: '',
          gallery_6: '',
          gallery_7: '',
          gallery_8: '',
        })
      }
    } catch (error) {
      console.error('Error fetching program content:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat konten program',
        variant: 'destructive',
      })
    } finally {
      setLoadingProgram(false)
    }
  }, [toast])

  const saveProgramContent = useCallback(async () => {
    if (!selectedProgram) {
      toast({
        title: 'Error',
        description: 'Pilih program terlebih dahulu',
        variant: 'destructive',
      })
      return
    }
    setSavingProgram(true)
    try {
      const response = await fetch(`/api/program-content/${selectedProgram}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programContent)
      })
      if (response.ok) {
        toast({
          title: 'Berhasil',
          description: 'Konten program berhasil disimpan',
          variant: 'default',
        })
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving program content:', error)
      toast({
        title: 'Gagal',
        description: 'Gagal menyimpan konten program',
        variant: 'destructive',
      })
    } finally {
      setSavingProgram(false)
    }
  }, [selectedProgram, programContent, toast])

  // Image upload function
  const handleImageUpload = useCallback(async (field: string, file: File) => {
    if (!file) return

    setUploadingImage(field)
    setUploadProgress(prev => ({ ...prev, [field]: 0 }))

    const formData = new FormData()
    formData.append('file', file)

    try {
      // Simulate progress (in a real app, use XMLHttpRequest for progress tracking)
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
      setProgramContent(prev => ({ ...prev, [field]: data.url }))
      setUploadProgress(prev => ({ ...prev, [field]: 100 }))

      toast({
        title: 'Berhasil',
        description: 'Gambar berhasil diunggah',
        variant: 'default',
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        title: 'Gagal',
        description: error.message || 'Gagal mengunggah gambar',
        variant: 'destructive',
      })
      setUploadProgress(prev => ({ ...prev, [field]: 0 }))
    } finally {
      setUploadingImage(null)
      setTimeout(() => {
        setUploadProgress(prev => ({ ...prev, [field]: 0 }))
      }, 1000)
    }
  }, [toast])

  // Remove image function
  const handleRemoveImage = useCallback((field: string) => {
    setProgramContent(prev => ({ ...prev, [field]: '' }))
    toast({
      title: 'Berhasil',
      description: 'Gambar berhasil dihapus',
      variant: 'default',
    })
  }, [toast])

  // Tab 11: Visitor Statistics functions
  const fetchVisitorStats = useCallback(async () => {
    setLoadingVisitor(true)
    try {
      const response = await fetch('/api/visitor')
      if (response.ok) {
        const data = await response.json()
        setVisitorStats(data)
      }
    } catch (error) {
      console.error('Error fetching visitor stats:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat statistik pengunjung',
        variant: 'destructive',
      })
    } finally {
      setLoadingVisitor(false)
    }
  }, [toast])

  // Tab 12: User Logs functions
  const fetchUserLogs = useCallback(async () => {
    setLoadingLogs(true)
    try {
      const params = new URLSearchParams({
        page: logPage.toString(),
        limit: logLimit.toString(),
      })
      if (logUserFilter) {
        params.append('userId', logUserFilter)
      }
      const response = await fetch(`/api/user-logs?${params}`)
      if (response.ok) {
        const data = await response.json()
        setUserLogs(data.logs || data)
      }
    } catch (error) {
      console.error('Error fetching user logs:', error)
      toast({
        title: 'Error',
        description: 'Gagal memuat log Aktivitas Pengguna',
        variant: 'destructive',
      })
    } finally {
      setLoadingLogs(false)
    }
  }, [logPage, logLimit, logUserFilter, toast])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (user) {
      fetchSettings()
    }
  }, [user, fetchSettings])

  useEffect(() => {
    if (activeTab === 'visitor-stats' && user?.role === 'admin') {
      fetchVisitorStats()
    }
  }, [activeTab, user, fetchVisitorStats])

  useEffect(() => {
    if (activeTab === 'user-logs' && user?.role === 'admin') {
      fetchUserLogs()
    }
  }, [activeTab, user, fetchUserLogs])

  useEffect(() => {
    if (selectedProgram) {
      fetchProgramContent(selectedProgram)
    }
  }, [selectedProgram, fetchProgramContent])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const isAdmin = user?.role === 'admin'
  const isEditor = user?.role === 'editor'
  const canAccessAll = isAdmin
  const canAccessProgramContent = isAdmin || isEditor

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-blue-900" />
                <div>
                  <h1 className="text-lg font-bold hidden sm:block">SMK PGRI Wonoasri</h1>
                  <p className="text-xs text-foreground/60">Admin Settings</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.username}</span>
                <Badge variant="outline" className="text-xs">{user?.role}</Badge>
              </div>
              <button
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' })
                  router.push('/admin')
                }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-border pt-20 transform transition-transform md:translate-x-0 md:static md:pt-0 md:w-72 lg:w-80`}
        >
          <nav className="p-4 h-full overflow-y-auto">
            {/* Back to Dashboard Link */}
            <div className="mb-6">
              <Link
                href="/admin/dashboard"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-muted text-foreground"
              >
                <Settings size={20} />
                <span>Back to Dashboard</span>
              </Link>
            </div>

            {/* Tab Navigation */}
            <div className="space-y-4">
              {/* Content Settings Group */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2 py-2 bg-muted/50 rounded-lg">
                  <FolderOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Konten</span>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab('school-info')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'school-info'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>Info Sekolah</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('vision-mission')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'vision-mission'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Target className="w-4 h-4 shrink-0" />
                    <span>Visi Misi</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('programs')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'programs'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>Program</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('facilities')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'facilities'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Award className="w-4 h-4 shrink-0" />
                    <span>Fasilitas</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('ekskul')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'ekskul'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Ekskul</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('contact')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'contact'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Kontak</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('footer')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'footer'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Globe className="w-4 h-4 shrink-0" />
                    <span>Footer</span>
                  </button>
                </div>
              </div>

              {/* Program Settings Group */}
              {canAccessProgramContent && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-2 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <GraduationCapIcon className="w-4 h-4 text-yellow-600" />
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Program</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('program-content')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'program-content'
                        ? 'bg-yellow-500 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Konten Program</span>
                  </button>
                </div>
              )}

              {/* PPDB & Features Group */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2 py-2 bg-muted/50 rounded-lg">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Fitur</span>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('hybrid')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                    activeTab === 'hybrid'
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Star className="w-4 h-4 shrink-0" />
                  <span>Hybrid</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('ppdb')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                    activeTab === 'ppdb'
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Star className="w-4 h-4 shrink-0" />
                  <span>PPDB</span>
                </button>
              </div>

              {/* Admin Only Group */}
              {canAccessAll && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-2 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Admin</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('visitor-stats')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'visitor-stats'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 shrink-0" />
                    <span>Statistik Pengunjung</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('user-logs')
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm ${
                      activeTab === 'user-logs'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Activity className="w-4 h-4 shrink-0" />
                    <span>Logs Aktivitas</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Pengaturan Website</h1>
                  <p className="text-foreground/60 text-sm md:text-base">
                    Kelola semua konten website dari satu tempat
                  </p>
                </div>
                <Badge variant="secondary" className="w-fit gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>{isAdmin ? 'Admin Access' : 'Editor Access'}</span>
                </Badge>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

              {/* School Info Tab */}
              <TabsContent value="school-info">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Building2 size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Informasi Sekolah</CardTitle>
                          <CardDescription className="text-blue-100 mt-1">
                            Edit informasi dasar dan identitas sekolah
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Info className="w-3 h-3 mr-1" />
                        Wajib diisi
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Globe2 className="w-5 h-5 text-blue-900" />
                        <h3 className="text-lg font-semibold">Informasi Dasar</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="school_name" className="font-medium">Nama Sekolah</Label>
                            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">Wajib</Badge>
                          </div>
                          <Input
                            id="school_name"
                            value={settings.school_name || ''}
                            onChange={(e) => handleInputChange('school_name', e.target.value)}
                            placeholder="Masukkan nama sekolah"
                            className="text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="school_accreditation" className="font-medium">Akreditasi</Label>
                          <Input
                            id="school_accreditation"
                            value={settings.school_accreditation || ''}
                            onChange={(e) => handleInputChange('school_accreditation', e.target.value)}
                            placeholder="Contoh: Terakreditasi A"
                            className="text-base"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="school_address" className="font-medium">Alamat Lengkap</Label>
                          <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">Wajib</Badge>
                        </div>
                        <Textarea
                          id="school_address"
                          value={settings.school_address || ''}
                          onChange={(e) => handleInputChange('school_address', e.target.value)}
                          placeholder="Masukkan alamat lengkap sekolah"
                          rows={3}
                          className="text-base"
                        />
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Phone className="w-5 h-5 text-blue-900" />
                        <h3 className="text-lg font-semibold">Informasi Kontak</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="school_phone" className="font-medium">Telepon / WhatsApp</Label>
                            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">Wajib</Badge>
                          </div>
                          <Input
                            id="school_phone"
                            value={settings.school_phone || ''}
                            onChange={(e) => handleInputChange('school_phone', e.target.value)}
                            placeholder="Contoh: 085158333064"
                            className="text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="school_email" className="font-medium">Email Sekolah</Label>
                            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">Wajib</Badge>
                          </div>
                          <Input
                            id="school_email"
                            type="email"
                            value={settings.school_email || ''}
                            onChange={(e) => handleInputChange('school_email', e.target.value)}
                            placeholder="Contoh: info@sekolah.sch.id"
                            className="text-base"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['school_name', 'school_accreditation', 'school_address', 'school_phone', 'school_email'])}
                        disabled={saving}
                        size="lg"
                        className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vision & Mission Tab */}
              <TabsContent value="vision-mission">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Target size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Visi & Misi</CardTitle>
                          <CardDescription className="text-blue-100 mt-1">
                            Edit visi dan misi sekolah
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Info className="w-3 h-3 mr-1" />
                        Penting
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Vision Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Target className="w-5 h-5 text-blue-900" />
                        <h3 className="text-lg font-semibold">Visi Sekolah</h3>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vision_text" className="font-medium">Teks Visi</Label>
                        <Textarea
                          id="vision_text"
                          value={settings.vision_text || ''}
                          onChange={(e) => handleInputChange('vision_text', e.target.value)}
                          placeholder="Masukkan visi sekolah"
                          rows={4}
                          className="text-base"
                        />
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Visi sekolah akan ditampilkan di halaman beranda
                        </p>
                      </div>
                    </div>

                    {/* Mission Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <CheckCircle className="w-5 h-5 text-blue-900" />
                        <h3 className="text-lg font-semibold">Misi Sekolah</h3>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Masukkan 4 poin misi sekolah yang menjadi landasan pendidikan
                        </p>
                        {[1, 2, 3, 4].map((i) => (
                          <Card key={i} className="border-2">
                            <CardContent className="p-4 space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full">
                                  {i}
                                </Badge>
                                <Label htmlFor={`mission_${i}`} className="font-medium">Misi ke-{i}</Label>
                              </div>
                              <Textarea
                                id={`mission_${i}`}
                                value={settings[`mission_${i}`] || ''}
                                onChange={(e) => handleInputChange(`mission_${i}`, e.target.value)}
                                placeholder={`Masukkan misi ke-${i}`}
                                rows={2}
                                className="text-base"
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['vision_text', 'mission_1', 'mission_2', 'mission_3', 'mission_4'])}
                        disabled={saving}
                        size="lg"
                        className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Programs Tab */}
              <TabsContent value="programs">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <BookOpen size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Program Keahlian</CardTitle>
                          <CardDescription className="text-blue-100 mt-1">
                            Edit informasi 6 program keahlian
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Info className="w-3 h-3 mr-1" />
                        6 Program
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <Accordion type="multiple" className="w-full space-y-4">
                      {[
                        { id: 'dkv', name: 'Desain Komunikasi Visual', icon: '🎨' },
                        { id: 'tkj', name: 'Teknik Komputer & Jaringan', icon: '💻' },
                        { id: 'kc', name: 'Keperawatan', icon: '🏥' },
                        { id: 'bdp', name: 'Bisnis Daring & Pemasaran', icon: '📊' },
                        { id: 'ak', name: 'Akuntansi', icon: '📈' },
                        { id: 'mplb', name: 'Manajemen Perkantoran & Layanan Bisnis', icon: '📋' },
                      ].map((program) => (
                        <AccordionItem key={program.id} value={program.id} className="border-2 rounded-lg px-4">
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{program.icon}</span>
                              <div className="text-left">
                                <div className="font-semibold">{program.name}</div>
                                <div className="text-xs text-muted-foreground">Klik untuk mengedit</div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4 pb-2">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor={`program_${program.id}_title`} className="font-medium">Judul Program</Label>
                                <Input
                                  id={`program_${program.id}_title`}
                                  value={settings[`program_${program.id}_title`] || ''}
                                  onChange={(e) => handleInputChange(`program_${program.id}_title`, e.target.value)}
                                  placeholder={`Judul ${program.name}`}
                                  className="text-base"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`program_${program.id}_desc`} className="font-medium">Deskripsi Singkat</Label>
                                <Textarea
                                  id={`program_${program.id}_desc`}
                                  value={settings[`program_${program.id}_desc`] || ''}
                                  onChange={(e) => handleInputChange(`program_${program.id}_desc`, e.target.value)}
                                  placeholder={`Deskripsi ${program.name}`}
                                  rows={3}
                                  className="text-base"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection([
                          'program_dkv_title', 'program_dkv_desc',
                          'program_tkj_title', 'program_tkj_desc',
                          'program_kc_title', 'program_kc_desc',
                          'program_bdp_title', 'program_bdp_desc',
                          'program_ak_title', 'program_ak_desc',
                          'program_mplb_title', 'program_mplb_desc'
                        ])}
                        disabled={saving}
                        size="lg"
                        className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Semua Program</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Facilities Tab */}
              <TabsContent value="facilities">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Award size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Fasilitas Unggulan</CardTitle>
                          <CardDescription className="text-blue-100 mt-1">
                            Edit 8 fasilitas unggulan sekolah
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Info className="w-3 h-3 mr-1" />
                        8 Fasilitas
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Masukkan 8 fasilitas unggulan yang akan ditampilkan di halaman website
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Card key={i} className="border-2 hover:border-blue-900/50 transition-colors">
                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 text-white border-blue-900">
                                {i}
                              </Badge>
                              <Label htmlFor={`facility_${i}`} className="font-medium">Fasilitas {i}</Label>
                            </div>
                            <Input
                              id={`facility_${i}`}
                              value={settings[`facility_${i}`] || ''}
                              onChange={(e) => handleInputChange(`facility_${i}`, e.target.value)}
                              placeholder={`Masukkan nama fasilitas ke-${i}`}
                              className="text-base"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['facility_1', 'facility_2', 'facility_3', 'facility_4', 'facility_5', 'facility_6', 'facility_7', 'facility_8'])}
                        disabled={saving}
                        size="lg"
                        className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Ekstrakurikuler Tab */}
              <TabsContent value="ekskul">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Users size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Ekstrakurikuler</CardTitle>
                          <CardDescription className="text-blue-100 mt-1">
                            Edit 8 kegiatan ekstrakurikuler
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Info className="w-3 h-3 mr-1" />
                        8 Kegiatan
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Masukkan 8 kegiatan ekstrakurikuler yang tersedia di sekolah
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Card key={i} className="border-2 hover:border-blue-900/50 transition-colors">
                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 text-white border-blue-900">
                                {i}
                              </Badge>
                              <Label htmlFor={`ekstrakurikuler_${i}`} className="font-medium">Ekstrakurikuler {i}</Label>
                            </div>
                            <Input
                              id={`ekstrakurikuler_${i}`}
                              value={settings[`ekstrakurikuler_${i}`] || ''}
                              onChange={(e) => handleInputChange(`ekstrakurikuler_${i}`, e.target.value)}
                              placeholder={`Masukkan nama ekstrakurikuler ke-${i}`}
                              className="text-base"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['ekstrakurikuler_1', 'ekstrakurikuler_2', 'ekstrakurikuler_3', 'ekstrakurikuler_4', 'ekstrakurikuler_5', 'ekstrakurikuler_6', 'ekstrakurikuler_7', 'ekstrakurikuler_8'])}
                        disabled={saving}
                        size="lg"
                        className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Hybrid Learning Tab */}
              <TabsContent value="hybrid">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Star size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Program Unggulan</CardTitle>
                          <CardDescription className="text-yellow-100 mt-1">
                            Edit program Hybrid Learning dan fitur-fiturnya
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Unggulan
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Program Info Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Star className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-lg font-semibold">Informasi Program</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="program_unggulan_title" className="font-medium">Judul Program</Label>
                          <Input
                            id="program_unggulan_title"
                            value={settings.program_unggulan_title || ''}
                            onChange={(e) => handleInputChange('program_unggulan_title', e.target.value)}
                            placeholder="Masukkan judul program unggulan"
                            className="text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="program_unggulan_desc" className="font-medium">Deskripsi Program</Label>
                          <Textarea
                            id="program_unggulan_desc"
                            value={settings.program_unggulan_desc || ''}
                            onChange={(e) => handleInputChange('program_unggulan_desc', e.target.value)}
                            placeholder="Masukkan deskripsi lengkap program"
                            rows={3}
                            className="text-base"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Features Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-lg font-semibold">Fitur Unggulan</h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Masukkan 8 fitur utama yang ditawarkan program ini
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <Card key={i} className="border-2 hover:border-yellow-500/50 transition-colors">
                            <CardContent className="p-4 space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white border-yellow-500">
                                  {i}
                                </Badge>
                                <Label htmlFor={`feature_${i}`} className="font-medium">Fitur {i}</Label>
                              </div>
                              <Input
                                id={`feature_${i}`}
                                value={settings[`feature_${i}`] || ''}
                                onChange={(e) => handleInputChange(`feature_${i}`, e.target.value)}
                                placeholder={`Masukkan fitur ke-${i}`}
                                className="text-base"
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['program_unggulan_title', 'program_unggulan_desc', 'feature_1', 'feature_2', 'feature_3', 'feature_4', 'feature_5', 'feature_6', 'feature_7', 'feature_8'])}
                        disabled={saving}
                        size="lg"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* PPDB Tab */}
              <TabsContent value="ppdb">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <ScrollText size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Informasi PPDB/SPMB</CardTitle>
                          <CardDescription className="text-yellow-100 mt-1">
                            Edit informasi pendaftaran dan beasiswa
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Penting
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* PPDB Tahap 2 */}
                    <Card className="border-2 border-l-4 border-l-yellow-500">
                      <CardHeader className="bg-muted/50 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge className="bg-yellow-500 text-white">Tahap 2</Badge>
                          Periode Pendaftaran Kedua
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="ppdb_tahap2_period" className="font-medium">Periode Pendaftaran</Label>
                          <Input
                            id="ppdb_tahap2_period"
                            value={settings.ppdb_tahap2_period || ''}
                            onChange={(e) => handleInputChange('ppdb_tahap2_period', e.target.value)}
                            placeholder="Contoh: 1 Juni - 31 Juli 2025"
                            className="text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ppdb_tahap2_benefit" className="font-medium">Keuntungan / Benefit</Label>
                          <Textarea
                            id="ppdb_tahap2_benefit"
                            value={settings.ppdb_tahap2_benefit || ''}
                            onChange={(e) => handleInputChange('ppdb_tahap2_benefit', e.target.value)}
                            placeholder="Masukkan benefit atau keuntungan mendaftar di tahap 2"
                            rows={2}
                            className="text-base"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* PPDB Tahap 3 */}
                    <Card className="border-2 border-l-4 border-l-orange-500">
                      <CardHeader className="bg-muted/50 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge className="bg-orange-500 text-white">Tahap 3</Badge>
                          Periode Pendaftaran Ketiga
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="ppdb_tahap3_period" className="font-medium">Periode Pendaftaran</Label>
                          <Input
                            id="ppdb_tahap3_period"
                            value={settings.ppdb_tahap3_period || ''}
                            onChange={(e) => handleInputChange('ppdb_tahap3_period', e.target.value)}
                            placeholder="Contoh: 1 Agustus - 15 September 2025"
                            className="text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ppdb_tahap3_benefit" className="font-medium">Keuntungan / Benefit</Label>
                          <Textarea
                            id="ppdb_tahap3_benefit"
                            value={settings.ppdb_tahap3_benefit || ''}
                            onChange={(e) => handleInputChange('ppdb_tahap3_benefit', e.target.value)}
                            placeholder="Masukkan benefit atau keuntungan mendaftar di tahap 3"
                            rows={2}
                            className="text-base"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Beasiswa Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-lg font-semibold">Jenis Beasiswa</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Masukkan 3 jenis beasiswa yang tersedia
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                          <Card key={i} className="border-2">
                            <CardContent className="p-4 space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white border-yellow-500">
                                  {i}
                                </Badge>
                                <Label htmlFor={`scholarship_${i}`} className="font-medium text-sm">Beasiswa {i}</Label>
                              </div>
                              <Input
                                id={`scholarship_${i}`}
                                value={settings[`scholarship_${i}`] || ''}
                                onChange={(e) => handleInputChange(`scholarship_${i}`, e.target.value)}
                                placeholder={`Nama beasiswa ke-${i}`}
                                className="text-sm"
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['ppdb_tahap2_period', 'ppdb_tahap2_benefit', 'ppdb_tahap3_period', 'ppdb_tahap3_benefit', 'scholarship_1', 'scholarship_2', 'scholarship_3'])}
                        disabled={saving}
                        size="lg"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Phone size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Kontak & Sosial Media</CardTitle>
                          <CardDescription className="text-blue-100 mt-1">
                            Edit kontak dan link sosial media sekolah
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Globe2 className="w-3 h-3 mr-1" />
                        Media
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Social Media Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Globe className="w-5 h-5 text-blue-900" />
                        <h3 className="text-lg font-semibold">Link Sosial Media</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="contact_whatsapp" className="font-medium flex items-center gap-2">
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center rounded bg-green-500 text-white border-green-500 text-[10px]">WA</Badge>
                            WhatsApp
                          </Label>
                          <Input
                            id="contact_whatsapp"
                            value={settings.contact_whatsapp || ''}
                            onChange={(e) => handleInputChange('contact_whatsapp', e.target.value)}
                            placeholder="Contoh: 085158333064"
                            className="text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact_tiktok" className="font-medium flex items-center gap-2">
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center rounded bg-black text-white border-black text-[10px]">TT</Badge>
                            TikTok URL
                          </Label>
                          <Input
                            id="contact_tiktok"
                            value={settings.contact_tiktok || ''}
                            onChange={(e) => handleInputChange('contact_tiktok', e.target.value)}
                            placeholder="https://tiktok.com/@username"
                            className="text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact_instagram" className="font-medium flex items-center gap-2">
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent text-[10px]">IG</Badge>
                            Instagram URL
                          </Label>
                          <Input
                            id="contact_instagram"
                            value={settings.contact_instagram || ''}
                            onChange={(e) => handleInputChange('contact_instagram', e.target.value)}
                            placeholder="https://instagram.com/username"
                            className="text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact_youtube" className="font-medium flex items-center gap-2">
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center rounded bg-red-600 text-white border-red-600 text-[10px]">YT</Badge>
                            YouTube URL
                          </Label>
                          <Input
                            id="contact_youtube"
                            value={settings.contact_youtube || ''}
                            onChange={(e) => handleInputChange('contact_youtube', e.target.value)}
                            placeholder="https://youtube.com/@username"
                            className="text-base"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Maps Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <MapPin className="w-5 h-5 text-blue-900" />
                        <h3 className="text-lg font-semibold">Peta Lokasi</h3>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact_maps" className="font-medium">Google Maps Embed URL</Label>
                        <Textarea
                          id="contact_maps"
                          value={settings.contact_maps || ''}
                          onChange={(e) => handleInputChange('contact_maps', e.target.value)}
                          placeholder="Masukkan URL embed Google Maps"
                          rows={3}
                          className="text-base"
                        />
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Dapatkan URL embed dari Google Maps → Share → Embed a map
                        </p>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['contact_whatsapp', 'contact_tiktok', 'contact_instagram', 'contact_youtube', 'contact_maps'])}
                        disabled={saving}
                        size="lg"
                        className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Footer Tab */}
              <TabsContent value="footer">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Globe size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl">Informasi Footer</CardTitle>
                          <CardDescription className="text-blue-100 mt-1">
                            Edit teks yang ditampilkan di footer website
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <ScrollText className="w-5 h-5 text-blue-900" />
                        <h3 className="text-lg font-semibold">Tentang Sekolah</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="footer_about" className="font-medium">Teks Footer / Tentang</Label>
                        <Textarea
                          id="footer_about"
                          value={settings.footer_about || ''}
                          onChange={(e) => handleInputChange('footer_about', e.target.value)}
                          placeholder="Masukkan deskripsi singkat tentang sekolah yang akan ditampilkan di footer"
                          rows={4}
                          className="text-base"
                        />
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Teks ini akan muncul di bagian bawah setiap halaman
                        </p>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end pt-4 border-t">
                      <Button
                        onClick={() => saveSection(['footer_about'])}
                        disabled={saving}
                        size="lg"
                        className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 10: Program Content */}
              {canAccessProgramContent && (
                <TabsContent value="program-content">
                  <Card className="border-2">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg">
                            <FileText size={28} />
                          </div>
                          <div>
                            <CardTitle className="text-xl md:text-2xl">Konten Program Keahlian</CardTitle>
                            <CardDescription className="text-yellow-100 mt-1">
                              Edit konten lengkap untuk setiap program keahlian
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <ScrollText className="w-3 h-3 mr-1" />
                          Detail
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Program Selector */}
                      <Card className="border-2 border-yellow-200 bg-yellow-50/50">
                        <CardContent className="p-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="program-select" className="font-medium flex items-center gap-2">
                              <GraduationCapIcon className="w-4 h-4 text-yellow-600" />
                              Pilih Program Keahlian
                            </Label>
                            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                              <SelectTrigger id="program-select" className="text-base">
                                <SelectValue placeholder="Pilih program keahlian untuk mengedit kontennya" />
                              </SelectTrigger>
                              <SelectContent>
                                {programs.map((program) => (
                                  <SelectItem key={program.code} value={program.code}>
                                    {program.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {loadingProgram && (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mb-4" />
                          <p className="text-muted-foreground">Memuat konten program...</p>
                        </div>
                      )}

                      {selectedProgram && !loadingProgram && (
                        <div className="space-y-6">
                          {/* Basic Info */}
                          <Card className="border-2">
                            <CardHeader className="bg-muted/50 pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Informasi Dasar
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="program-title" className="font-medium">Judul Program</Label>
                                <Input
                                  id="program-title"
                                  value={programContent.title}
                                  onChange={(e) => setProgramContent(prev => ({ ...prev, title: e.target.value }))}
                                  placeholder="Masukkan judul program"
                                  className="text-base"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="program-description" className="font-medium">Deskripsi Singkat</Label>
                                <Textarea
                                  id="program-description"
                                  value={programContent.description}
                                  onChange={(e) => setProgramContent(prev => ({ ...prev, description: e.target.value }))}
                                  placeholder="Masukkan deskripsi singkat program"
                                  rows={3}
                                  className="text-base"
                                />
                              </div>
                            </CardContent>
                          </Card>

                          <Accordion type="multiple" className="w-full space-y-3">
                            {/* Vision */}
                            <AccordionItem value="vision" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <Target className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Visi Program</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.vision}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, vision: e.target.value }))}
                                    placeholder="Masukkan visi program"
                                    rows={4}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Goals */}
                            <AccordionItem value="goals" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Tujuan Program</span>
                                  <Badge variant="outline" className="text-[10px]">Satu per baris</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.goals}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, goals: e.target.value }))}
                                    placeholder="Masukkan tujuan program, satu per baris"
                                    rows={5}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Competencies */}
                            <AccordionItem value="competencies" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <Award className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Kompetensi Inti</span>
                                  <Badge variant="outline" className="text-[10px]">Satu per baris</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.competencies}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, competencies: e.target.value }))}
                                    placeholder="Masukkan kompetensi, satu per baris"
                                    rows={8}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Subjects */}
                            <AccordionItem value="subjects" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <BookOpen className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Mata Pelajaran</span>
                                  <Badge variant="outline" className="text-[10px]">Format: Nama - Deskripsi</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.subjects}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, subjects: e.target.value }))}
                                    placeholder="Contoh: Sistem Komputer - Mempelajari dasar komputer"
                                    rows={6}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Jobs */}
                            <AccordionItem value="jobs" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <Users className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Peluang Kerja</span>
                                  <Badge variant="outline" className="text-[10px]">Satu per baris</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.jobs}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, jobs: e.target.value }))}
                                    placeholder="Masukkan peluang kerja, satu per baris"
                                    rows={8}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Majors */}
                            <AccordionItem value="majors" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <GraduationCapIcon className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Peluang Kuliah/Jurusan</span>
                                  <Badge variant="outline" className="text-[10px]">Satu per baris</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.majors}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, majors: e.target.value }))}
                                    placeholder="Masukkan jurusan kuliah, satu per baris"
                                    rows={8}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Partners */}
                            <AccordionItem value="partners" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <Building2 className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Mitra Industri / Tempat PKL</span>
                                  <Badge variant="outline" className="text-[10px]">Format: Nama - Tipe</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.partners}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, partners: e.target.value }))}
                                    placeholder="Contoh: PT Telkom - Perusahaan Telekomunikasi"
                                    rows={6}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Facilities */}
                            <AccordionItem value="facilities" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <Award className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Fasilitas Program</span>
                                  <Badge variant="outline" className="text-[10px]">Satu per baris</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.facilities}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, facilities: e.target.value }))}
                                    placeholder="Masukkan fasilitas, satu per baris"
                                    rows={6}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Achievements */}
                            <AccordionItem value="achievements" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <Star className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Prestasi</span>
                                  <Badge variant="outline" className="text-[10px]">Satu per baris</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.achievements}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, achievements: e.target.value }))}
                                    placeholder="Masukkan prestasi, satu per baris"
                                    rows={5}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Certifications */}
                            <AccordionItem value="certifications" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Sertifikasi</span>
                                  <Badge variant="outline" className="text-[10px]">Format: Nama - Level</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.certifications}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, certifications: e.target.value }))}
                                    placeholder="Contoh: MTCNA - Basic"
                                    rows={5}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Gallery Images */}
                            <AccordionItem value="gallery" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <ImagePlus className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Galeri Foto</span>
                                  <Badge variant="outline" className="text-[10px]">8 Foto</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-4">
                                  <p className="text-sm text-muted-foreground">
                                    Unggah 8 foto galeri untuk program ini (maksimal 5MB per foto, format: JPG, PNG, WEBP)
                                  </p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                                      const field = `gallery_${num}` as keyof ProgramContentData
                                      const imageUrl = programContent[field] as string
                                      const isUploading = uploadingImage === field
                                      const progress = uploadProgress[field] || 0

                                      return (
                                        <Card key={num} className="border-2">
                                          <CardContent className="p-3 space-y-2">
                                            <div className="flex items-center justify-between">
                                              <Label className="text-sm font-medium">Foto {num}</Label>
                                              {imageUrl && (
                                                <Button
                                                  type="button"
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => handleRemoveImage(field)}
                                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                  <XIcon className="w-4 h-4" />
                                                </Button>
                                              )}
                                            </div>

                                            {imageUrl ? (
                                              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-border group">
                                                <img
                                                  src={imageUrl}
                                                  alt={`Gallery ${num}`}
                                                  className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                  <label
                                                    htmlFor={`upload-${field}`}
                                                    className="cursor-pointer flex items-center gap-2 bg-white/90 text-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-white"
                                                  >
                                                    <Upload className="w-4 h-4" />
                                                    Ganti
                                                  </label>
                                                </div>
                                                <input
                                                  id={`upload-${field}`}
                                                  type="file"
                                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                                  className="hidden"
                                                  onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(field, file)
                                                  }}
                                                  disabled={isUploading}
                                                />
                                              </div>
                                            ) : (
                                              <div className="relative aspect-square rounded-lg border-2 border-dashed border-border hover:border-yellow-500 transition-colors flex flex-col items-center justify-center bg-muted/30">
                                                {isUploading ? (
                                                  <div className="flex flex-col items-center gap-2">
                                                    <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                                                    <span className="text-xs text-muted-foreground">{progress}%</span>
                                                  </div>
                                                ) : (
                                                  <label
                                                    htmlFor={`upload-${field}`}
                                                    className="cursor-pointer flex flex-col items-center gap-2 p-4 w-full h-full"
                                                  >
                                                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                                      <Upload className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground text-center">
                                                      Klik untuk unggah
                                                    </span>
                                                  </label>
                                                )}
                                                <input
                                                  id={`upload-${field}`}
                                                  type="file"
                                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                                  className="hidden"
                                                  onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(field, file)
                                                  }}
                                                  disabled={isUploading}
                                                />
                                              </div>
                                            )}
                                          </CardContent>
                                        </Card>
                                      )
                                    })}
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            {/* Testimonials */}
                            <AccordionItem value="testimonials" className="border-2 rounded-lg px-4">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-3">
                                  <Users className="w-5 h-5 text-yellow-600" />
                                  <span className="font-semibold">Testimoni Alumni</span>
                                  <Badge variant="outline" className="text-[10px]">Format: Nama - Testimoni</Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="space-y-2">
                                  <Textarea
                                    value={programContent.testimonials}
                                    onChange={(e) => setProgramContent(prev => ({ ...prev, testimonials: e.target.value }))}
                                    placeholder="Contoh: Ahmad - Lulusan 2023 sangat puas"
                                    rows={5}
                                    className="text-base"
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                          {/* Save Button */}
                          <div className="flex items-center justify-end pt-4 border-t">
                            <Button
                              onClick={saveProgramContent}
                              disabled={savingProgram}
                              size="lg"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white gap-2 w-full md:w-auto"
                            >
                              {savingProgram ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Menyimpan...</span>
                                </>
                              ) : (
                                <>
                                  <Save className="w-4 h-4" />
                                  <span>Simpan Konten Program</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Tab 11: Visitor Statistics */}
              {canAccessAll && (
                <TabsContent value="visitor-stats">
                  <Card className="border-2">
                    <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg">
                            <BarChart3 size={28} />
                          </div>
                          <div>
                            <CardTitle className="text-xl md:text-2xl">Statistik Pengunjung</CardTitle>
                            <CardDescription className="text-blue-100 mt-1">
                              Statistik kunjungan website secara real-time
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Eye className="w-3 h-3 mr-1" />
                          Admin Only
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {loadingVisitor ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mb-4" />
                          <p className="text-muted-foreground">Memuat statistik...</p>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                          <Card className="border-2 border-l-4 border-l-blue-900 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-foreground/60">Total Kunjungan</p>
                                  <p className="text-4xl font-bold text-blue-900">
                                    {visitorStats.totalVisits.toLocaleString()}
                                  </p>
                                  <Badge variant="outline" className="text-xs">Semua waktu</Badge>
                                </div>
                                <Database className="w-16 h-16 text-blue-900/20" />
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-foreground/60">Kunjungan Hari Ini</p>
                                  <p className="text-4xl font-bold text-yellow-600">
                                    {visitorStats.todayVisits.toLocaleString()}
                                  </p>
                                  <Badge variant="outline" className="text-xs">Hari ini</Badge>
                                </div>
                                <Activity className="w-16 h-16 text-yellow-500/20" />
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-2 border-l-4 border-l-blue-900 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-foreground/60">Kunjungan Bulan Ini</p>
                                  <p className="text-4xl font-bold text-blue-900">
                                    {visitorStats.monthVisits.toLocaleString()}
                                  </p>
                                  <Badge variant="outline" className="text-xs">Bulan ini</Badge>
                                </div>
                                <BarChart3 className="w-16 h-16 text-blue-900/20" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Tab 12: User Activity Logs */}
              {canAccessAll && (
                <TabsContent value="user-logs">
                  <Card className="border-2">
                    <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg">
                            <Activity size={28} />
                          </div>
                          <div>
                            <CardTitle className="text-xl md:text-2xl">Log Aktivitas Pengguna</CardTitle>
                            <CardDescription className="text-blue-100 mt-1">
                              Riwayat aktivitas pengguna sistem
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Eye className="w-3 h-3 mr-1" />
                          Admin Only
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Filter Section */}
                        <Card className="border-2 bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="flex-1 space-y-2">
                                <Label htmlFor="user-filter" className="font-medium">Filter Berdasarkan User ID</Label>
                                <Input
                                  id="user-filter"
                                  value={logUserFilter}
                                  onChange={(e) => setLogUserFilter(e.target.value)}
                                  placeholder="Masukkan user ID untuk filter"
                                  className="text-base"
                                />
                              </div>
                              <div className="flex items-end gap-2">
                                <Button
                                  onClick={() => setLogPage(1)}
                                  className="bg-blue-900 hover:bg-blue-800 text-white gap-2"
                                  size="lg"
                                >
                                  <Activity className="w-4 h-4" />
                                  Filter
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {loadingLogs ? (
                          <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-900 mb-4" />
                            <p className="text-muted-foreground">Memuat log aktivitas...</p>
                          </div>
                        ) : (
                          <>
                            {/* Logs Table */}
                            <div className="border-2 rounded-lg overflow-hidden">
                              <ScrollArea className="max-h-96">
                                <table className="w-full">
                                  <thead className="bg-muted sticky top-0">
                                    <tr>
                                      <th className="px-4 py-3 text-left text-sm font-semibold">Timestamp</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold">User ID</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold">Username</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold">Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {userLogs.length === 0 ? (
                                      <tr>
                                        <td colSpan={5} className="px-4 py-12 text-center">
                                          <div className="flex flex-col items-center gap-3">
                                            <Activity className="w-12 h-12 text-muted-foreground/30" />
                                            <p className="text-muted-foreground">Tidak ada data log</p>
                                          </div>
                                        </td>
                                      </tr>
                                    ) : (
                                      userLogs.map((log) => (
                                        <tr key={log.id} className="border-t hover:bg-muted/50 transition-colors">
                                          <td className="px-4 py-3 text-sm">
                                            {new Date(log.createdAt).toLocaleString('id-ID')}
                                          </td>
                                          <td className="px-4 py-3 text-sm font-mono">
                                            {log.userId}
                                          </td>
                                          <td className="px-4 py-3 text-sm font-medium">
                                            {log.username || '-'}
                                          </td>
                                          <td className="px-4 py-3 text-sm">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                              {log.action}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-sm text-foreground/60">
                                            {log.details || '-'}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </ScrollArea>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <p className="text-sm text-muted-foreground">
                                Menampilkan halaman <span className="font-semibold text-foreground">{logPage}</span>
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => setLogPage(prev => Math.max(1, prev - 1))}
                                  disabled={logPage === 1}
                                  variant="outline"
                                  size="sm"
                                >
                                  <ChevronLeft className="w-4 h-4 mr-1" />
                                  Sebelumnya
                                </Button>
                                <Button
                                  onClick={() => setLogPage(prev => prev + 1)}
                                  disabled={userLogs.length < logLimit}
                                  variant="outline"
                                  size="sm"
                                >
                                  Selanjutnya
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
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
