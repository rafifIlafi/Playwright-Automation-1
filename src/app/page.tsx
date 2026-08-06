'use client'

import { useState, useEffect } from 'react'
import { Menu, X, GraduationCap, Users, Building2, Newspaper, Image as ImageIcon, MapPin, Phone, Mail, Facebook, Instagram, Youtube, ChevronRight, BookOpen, Trophy, Target, Award, Clock, Wifi, Music, Video, Library, Store, Radio, CheckCircle, Star, Zap, Globe, Smartphone, Verified, MessageCircle, Network, Heart, Calendar, Calculator, Briefcase, FlaskConical, Sparkles, BarChart3, Loader2, FileText, Download, FileQuestion, FileText as FilePdf } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [beritaList, setBeritaList] = useState<any[]>([])
  const [galeriList, setGaleriList] = useState<any[]>([])
  const [dokumenKegiatan, setDokumenKegiatan] = useState<any>(null)
  const [loadingBerita, setLoadingBerita] = useState(true)
  const [loadingGaleri, setLoadingGaleri] = useState(true)
  const [loadingKegiatan, setLoadingKegiatan] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track visitor
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: null, // Will be handled by server
            userAgent: navigator.userAgent
          })
        })
      } catch (error) {
        // Silently fail to not affect user experience
        console.error('Failed to track visitor:', error)
      }
    }
    trackVisitor()
  }, [])

  // Track click events
  const trackClick = (contentType: string, contentName: string, contentId?: string) => {
    // Non-blocking fetch to track click
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentType,
        contentId,
        contentName
      })
    }).catch((error) => {
      // Silently fail to not affect user experience
      console.error('Failed to track click:', error)
    })
  }

  // Fetch berita
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        setLoadingBerita(true)
        const response = await fetch('/api/berita')
        if (response.ok) {
          const data = await response.json()
          setBeritaList(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to fetch berita:', error)
      } finally {
        setLoadingBerita(false)
      }
    }
    fetchBerita()
  }, [])

  // Fetch galeri
  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        setLoadingGaleri(true)
        const response = await fetch('/api/galeri')
        if (response.ok) {
          const data = await response.json()
          setGaleriList(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to fetch galeri:', error)
      } finally {
        setLoadingGaleri(false)
      }
    }
    fetchGaleri()
  }, [])

  // Fetch dokumen kegiatan aktif
  useEffect(() => {
    const fetchDokumenKegiatan = async () => {
      try {
        setLoadingKegiatan(true)
        const response = await fetch('/api/dokumen-kegiatan?active=true')
        if (response.ok) {
          const data = await response.json()
          setDokumenKegiatan(data)
        }
      } catch (error) {
        console.error('Failed to fetch dokumen kegiatan:', error)
      } finally {
        setLoadingKegiatan(false)
      }
    }
    fetchDokumenKegiatan()
  }, [])

  const scrollToSection = (id: string, label: string) => {
    trackClick('nav', label, id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => scrollToSection('home')}
            >
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8" />
              <div>
                <h1 className="text-base sm:text-xl font-bold">SMK PGRI Wonoasri</h1>
                <p className={`text-[10px] sm:text-xs ${isScrolled ? 'text-foreground/70' : 'text-white/80'}`}>
                  Terakreditasi A
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { label: 'Beranda', id: 'home' },
                { label: 'Tentang', id: 'tentang' },
                { label: 'Program', id: 'program' },
                { label: 'Fasilitas', id: 'fasilitas' },
                { label: 'PPDB', id: 'ppdb' },
                { label: 'Berita', id: 'berita' },
                { label: 'Kontak', id: 'kontak' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium text-sm transition-colors hover:text-yellow-500 ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://lms.smkbimari.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('external', 'LMS')}
                className={`font-medium text-sm transition-colors hover:text-yellow-500 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                LMS
              </a>
              <a
                href="/admin"
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-colors text-sm"
              >
                Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
            <div className="px-3 py-4 space-y-1">
              {[
                { label: 'Beranda', id: 'home' },
                { label: 'Tentang', id: 'tentang' },
                { label: 'Program', id: 'program' },
                { label: 'Fasilitas', id: 'fasilitas' },
                { label: 'PPDB', id: 'ppdb' },
                { label: 'Berita', id: 'berita' },
                { label: 'Kontak', id: 'kontak' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3.5 text-foreground hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors font-medium text-base"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://lms.smkbimari.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('external', 'LMS Mobile')}
                className="block w-full text-left px-4 py-3.5 text-foreground hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors font-medium text-base"
              >
                LMS
              </a>
              <a
                href="/admin"
                className="block w-full text-left px-4 py-3.5 bg-yellow-500 text-black rounded-lg font-medium text-center hover:bg-yellow-600 transition-colors text-base"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTR2NGg0djR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-12 sm:py-20">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-fade-in">
            🏆 Terakreditasi A
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-up leading-tight">
            SMK PGRI Wonoasri
          </h1>
          <p className="text-base sm:text-xl md:text-3xl text-yellow-400 mb-3 sm:mb-4 font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Mencetak Generasi Unggul & Berkarakter
          </p>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Meningkatkan kecerdasan, menanamkan karakter baik, melatih ketrampilan untuk berwirausaha dan siap memasuki dunia kerja
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => scrollToSection('ppdb')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-xl text-sm sm:text-base"
            >
              Daftar PPDB 2026/2027
            </button>
            <button
              onClick={() => scrollToSection('program')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold rounded-xl transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              Lihat Program Keahlian
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-yellow-400 rotate-90" />
        </div>
      </section>

      {/* About/Vision/Mission Section */}
      <section id="tentang" className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in">Tentang Kami</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-5 sm:p-8 md:p-12 text-white mb-8 sm:mb-12 shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Visi Sekolah</h3>
            </div>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              Meningkatkan kecerdasan, Menanamkan karakter baik, melatih ketrampilan untuk berwirausaha dan siap memasuki di dunia kerja serta melanjutkan ke jenjang lebih tinggi sesuai dengan kejuruan.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-900 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Misi Sekolah</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-foreground/70 text-base sm:text-lg mb-3 sm:mb-4">
                Untuk mewujudkan visi sekolah, SMK PGRI Wonoasri merumuskan misi sekolah sebagai berikut:
              </p>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-base">1</span>
                  </div>
                  <p className="text-foreground/80 text-sm sm:text-base">
                    Menyiapkan siswa untuk berpikir secara positif, kreatif dan bernalar kritis
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-base">2</span>
                  </div>
                  <p className="text-foreground/80 text-sm sm:text-base">
                    Meningkatkan perkembangan kepribadian siswa, agar dapat berdisiplin, jujur, bertanggung jawab, percaya diri, mandiri dan berperilaku sopan
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-base">3</span>
                  </div>
                  <p className="text-foreground/80 text-sm sm:text-base">
                    Memiliki dan mengembangkan skill sesuai dengan kompetensi keahlian dunia kerja, dan dunia wirausaha
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-base">4</span>
                  </div>
                  <p className="text-foreground/80 text-sm sm:text-base">
                    Menyiapkan siswa melanjutkan ke perguruan tinggi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Keahlian Section */}
      <section id="program" className="py-12 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in">Program Keahlian</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 mt-4 sm:mt-6 max-w-2xl mx-auto">
              Pilihan program keahlian yang relevan dengan kebutuhan dunia kerja saat ini
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: <Video />,
                title: 'Desain Komunikasi Visual (DKV)',
                desc: 'Mempelajari desain grafis, fotografi, videografi, animasi, dan multimedia untuk kreatif industri.',
                link: '/program/dkv'
              },
              {
                icon: <Network />,
                title: 'Teknik Komputer & Jaringan (TKJ)',
                desc: 'Mempelajari perakitan komputer, instalasi jaringan, administrasi server, dan keamanan jaringan.',
                link: '/program/tkj'
              },
              {
                icon: <Sparkles />,
                title: 'Tata Kecantikan (KC)',
                desc: 'Fokus pada keahlian tata rias wajah, perawatan kulit, hair styling, dan manajemen kecantikan.',
                link: '/program/kc'
              },
              {
                icon: <BarChart3 />,
                title: 'Bisnis Digital Pemasaran (BDP)',
                desc: 'Belajar strategi pemasaran digital, social media marketing, e-commerce, dan analisis bisnis.',
                link: '/program/bdp'
              },
              {
                icon: <Calculator />,
                title: 'Akuntansi (AK)',
                desc: 'Menguasai pembukuan, perpajakan, analisis keuangan, dan aplikasi akuntansi berbasis komputer.',
                link: '/program/ak'
              },
              {
                icon: <Briefcase />,
                title: 'Manajemen Perkantoran & Layanan Bisnis (MPLB)',
                desc: 'Kompetensi dalam administrasi perkantoran, kearsipan, pelayanan prima, dan manajemen bisnis.',
                link: '/program/mplb'
              },
            ].map((program, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group border-2 border-transparent hover:border-yellow-500 flex flex-col"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-yellow-500 w-6 h-6 sm:w-8 sm:h-8">{program.icon}</div>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{program.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4 sm:mb-6 flex-grow">{program.desc}</p>
                <a
                  href={program.link}
                  onClick={() => trackClick('program', program.title)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors text-sm"
                >
                  Lihat Detail
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hybrid Learning Program Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 text-white rounded-full text-sm sm:text-lg font-bold mb-4 sm:mb-6">
              <Star className="w-5 h-5 sm:w-6 sm:h-6" />
              PROGRAM UNGGULAN
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Hybrid Learning</h2>
            <p className="text-base sm:text-xl text-yellow-400 max-w-3xl mx-auto">
              Metode pembelajaran inovatif yang menggabungkan berbagai pendekatan untuk hasil maksimal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: <Award />, label: 'Terakreditasi A' },
              { icon: <Clock />, label: 'Waktu Belajar Fleksibel' },
              { icon: <BookOpen />, label: 'Banyak Pilihan Jurusan' },
              { icon: <Building2 />, label: 'Belajar Proyek Nyata' },
              { icon: <Globe />, label: 'Koneksi Luas ke Dunia Kerja' },
              { icon: <Users />, label: 'Lingkungan Positif Kolaboratif' },
              { icon: <Verified />, label: 'Sertifikat BNSP' },
              { icon: <Smartphone />, label: 'Skill Digital & Microcredentials' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-yellow-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <div className="text-white w-5 h-5 sm:w-6 sm:h-6">{item.icon}</div>
                </div>
                <p className="text-white font-semibold text-xs sm:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section id="fasilitas" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in">Fasilitas Unggulan</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 mt-4 sm:mt-6 max-w-2xl mx-auto">
              Fasilitas modern dan lengkap untuk mendukung proses pembelajaran yang optimal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <Wifi />, label: 'Free WiFi 24 Jam' },
              { icon: <Music />, label: 'Studio Musik' },
              { icon: <Video />, label: 'Multimedia Center' },
              { icon: <FlaskConical />, label: 'Lab. Tiap Jurusan' },
              { icon: <Library />, label: 'Perpustakaan' },
              { icon: <Building2 />, label: 'Musholla' },
              { icon: <Radio />, label: 'Lapangan Olahraga' },
              { icon: <Building2 />, label: 'Aula Serbaguna' },
            ].map((fasilitas, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all hover:scale-105 group border border-blue-100 dark:border-blue-800"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-yellow-500 transition-colors">
                  <div className="text-yellow-500 group-hover:text-white transition-colors w-5 h-5 sm:w-6 sm:h-6">{fasilitas.icon}</div>
                </div>
                <p className="font-medium text-xs sm:text-sm text-foreground">{fasilitas.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in">Ekstrakurikuler</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 mt-4 sm:mt-6 max-w-2xl mx-auto">
              Kegiatan pengembangan diri untuk menunjang kreativitas dan bakat siswa
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              'Pramuka',
              'Hadroh',
              'Kelas Bahasa Jepang',
              'Volly',
              'Seni Tari',
              'Karawitan',
              'Pencak Seni',
              'Pik-R'
            ].map((ekstra, index) => (
              <div
                key={index}
                className="px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:from-blue-800 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {ekstra}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPDB Section */}
      <section id="ppdb" className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 text-white rounded-full text-sm sm:text-lg font-bold mb-4 sm:mb-6">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              SPMB 2026/2027
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Sistem Penerimaan Murid Baru</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 mt-4 sm:mt-6 max-w-3xl mx-auto">
              Tahun Ajaran 2026/2027 - Segera daftarkan diri Anda dan nikmati berbagai benefit menarik!
            </p>
          </div>

          {/* Registration Periods */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Tahap 2</h3>
                  <p className="text-xs sm:text-sm text-yellow-100">Early Bird</p>
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                  1 Desember 2025 - 28 Februari 2026
                </p>
                <p className="text-xs sm:text-sm text-yellow-100">Jangan lewatkan kesempatan ini!</p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Gratis 2 bulan biaya belajar</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Potongan seragam hingga 20%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Calendar />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Tahap 3</h3>
                  <p className="text-xs sm:text-sm text-blue-200">Regular</p>
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                  1 Maret 2026 - 31 Mei 2026
                </p>
                <p className="text-xs sm:text-sm text-blue-200">Kuota terbatas!</p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-sm sm:text-base">Gratis biaya belajar 1 bulan</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-sm sm:text-base">Fasilitas lengkap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">Beasiswa</h3>
                <p className="text-sm sm:text-base text-foreground/60">Kami mendukung siswa berprestasi dan berpotensi</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3 sm:gap-6">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h4 className="text-base sm:text-xl font-bold mb-2">Beasiswa Jalur Prestasi</h4>
                <p className="text-xs sm:text-sm sm:text-base text-foreground/70">
                  Untuk siswa dengan prestasi akademik atau non-akademik yang luar biasa
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h4 className="text-base sm:text-xl font-bold mb-2">Beasiswa Potensi</h4>
                <p className="text-xs sm:text-sm sm:text-base text-foreground/70">
                  Untuk siswa dengan potensi dan bakat yang berkembang
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Heart />
                </div>
                <h4 className="text-base sm:text-xl font-bold mb-2">Beasiswa Yatim Piatu</h4>
                <p className="text-xs sm:text-sm sm:text-base text-foreground/70">
                  Untuk siswa yatim piatu atau orang tua asuh yang membutuhkan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Section */}
      <section id="berita" className="py-12 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in">Berita Terbaru</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 mt-4 sm:mt-6 max-w-2xl mx-auto">
              Informasi terkini seputar kegiatan dan prestasi SMK PGRI Wonoasri
            </p>
          </div>

          {loadingBerita ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
            </div>
          ) : beritaList.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
              <Newspaper className="w-16 h-16 text-blue-900/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Belum Ada Berita</h3>
              <p className="text-foreground/60">Belum ada berita yang ditambahkan. Silakan tambahkan berita melalui admin panel.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {beritaList.slice(0, 3).map((berita, index) => (
                <a
                  key={berita.id}
                  href={`/berita/${berita.id}`}
                  onClick={() => trackClick('berita', berita.judul, berita.id)}
                  className="group block"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 h-full flex flex-col">
                    {berita.gambar ? (
                      <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-blue-800/10 relative overflow-hidden">
                        <img
                          src={berita.gambar}
                          alt={berita.judul}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-blue-800/10 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-blue-900/50" />
                      </div>
                    )}
                    <div className="p-4 sm:p-6 flex-grow">
                      <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-yellow-500 text-white text-xs sm:text-sm font-bold rounded-full mb-2 sm:mb-3">
                        Berita
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors">
                        {berita.judul}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/60 mb-3 sm:mb-4">
                        {new Date(berita.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <p className="text-xs sm:text-sm sm:text-base text-foreground/70 leading-relaxed line-clamp-3">
                        {berita.isi}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {beritaList.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <a
                href="/berita"
                onClick={() => trackClick('cta', 'Lihat Semua Berita')}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                Lihat Semua Berita
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Informasi Kegiatan Section */}
      {!loadingKegiatan && dokumenKegiatan && (
        <section id="kegiatan" className="py-12 sm:py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <Badge variant="secondary" className="mb-4 bg-yellow-500 text-white border-yellow-400">
                <Sparkles className="w-3 h-3 mr-1" />
                Kegiatan Terkini
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {dokumenKegiatan.judulKegiatan}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                <div className="mb-6 sm:mb-8">
                  <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                    {dokumenKegiatan.deskripsi}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {dokumenKegiatan.fileJuklak && (
                    <a
                      href={dokumenKegiatan.fileJuklak}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('download', 'Juklak', dokumenKegiatan.id)}
                      className="group flex items-center justify-center gap-3 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FilePdf className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                      <span className="text-sm sm:text-base">Download Juklak</span>
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}

                  {dokumenKegiatan.fileJuknis && (
                    <a
                      href={dokumenKegiatan.fileJuknis}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('download', 'Juknis', dokumenKegiatan.id)}
                      className="group flex items-center justify-center gap-3 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FilePdf className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                      <span className="text-sm sm:text-base">Download Juknis</span>
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Galeri Section */}
      <section id="galeri" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in">Galeri Kegiatan</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 mt-4 sm:mt-6 max-w-2xl mx-auto">
              Dokumentasi berbagai kegiatan dan prestasi siswa SMK PGRI Wonoasri
            </p>
          </div>

          {loadingGaleri ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
            </div>
          ) : galeriList.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
              <ImageIcon className="w-16 h-16 text-blue-900/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Belum Ada Galeri</h3>
              <p className="text-foreground/60">Belum ada galeri yang ditambahkan. Silakan tambahkan galeri melalui admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {galeriList.slice(0, 8).map((galeri) => (
                <a
                  key={galeri.id}
                  href="/galeri"
                  onClick={() => trackClick('galeri', galeri.judul, galeri.id)}
                  className="group block"
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
                    {galeri.gambar ? (
                      <img
                        src={galeri.gambar}
                        alt={galeri.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 text-blue-900/50 group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}

          {galeriList.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <a
                href="/galeri"
                onClick={() => trackClick('cta', 'Lihat Selengkapnya Galeri')}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded-xl hover:bg-blue-900 hover:text-white transition-all text-sm sm:text-base"
              >
                Lihat Selengkapnya
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-12 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in">Hubungi Kami</h2>
            <div className="w-20 sm:w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 mt-4 sm:mt-6 max-w-2xl mx-auto">
              Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Informasi Kontak</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base">Alamat</h4>
                      <p className="text-foreground/70 text-xs sm:text-sm">
                        Jl. Tamrin No.48, Caruban, Purwosari<br />
                        Kec. Wonoasri, Kab. Madiun<br />
                        Jawa Timur 63157
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base">WhatsApp</h4>
                      <p className="text-foreground/70 text-xs sm:text-sm">085158333064</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base">Email</h4>
                      <p className="text-foreground/70 text-xs sm:text-sm">info@smkpgriwonoasri.sch.id</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Ikuti Kami</h3>
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href="https://www.tiktok.com/@smkpgriwonoasri"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('social', 'TikTok')}
                    className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-800 to-black text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="TikTok"
                  >
                    <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/@smkpgriwonoasri"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('social', 'Instagram')}
                    className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://www.youtube.com/@smkpgriwonoasri8087"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('social', 'YouTube')}
                    className="w-10 h-10 sm:w-14 sm:h-14 bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:scale-110 transition-transform relative z-20 shadow-lg"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://wa.me/6285158333064"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('contact', 'WhatsApp')}
                    className="w-10 h-10 sm:w-14 sm:h-14 bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:scale-110 transition-transform relative z-20 shadow-lg"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.314562603578!2d111.54292627469316!3d-7.625530992472573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79c28b74e7809d%3A0x4a4b4e4a4b4e4a4b!2sJl.%20Tamrin%20No.48%2C%20Caruban%2C%20Purwosari%2C%20Kec.%20Wonoasri%2C%20Kab.%20Madiun%2C%20Jawa%20Timur%2063157!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px', sm: { minHeight: '500px' } }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                <h3 className="text-lg sm:text-xl font-bold">SMK PGRI Wonoasri</h3>
              </div>
              <p className="text-blue-200 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Mencetak generasi muda yang kompeten, berkarakter mulia, dan siap bersaing di dunia kerja serta berwirausaha.
              </p>
              <div className="flex gap-2 sm:gap-3">
                <a
                  href="https://www.tiktok.com/@smkpgriwonoasri"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('social', 'TikTok Footer')}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  aria-label="TikTok"
                >
                  <Music size={14} sm={18} />
                </a>
                <a
                  href="https://www.instagram.com/@smkpgriwonoasri"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('social', 'Instagram Footer')}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={14} sm={18} />
                </a>
                <a
                  href="https://www.youtube.com/@smkpgriwonoasri8087"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('social', 'YouTube Footer')}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={14} sm={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-yellow-500">Tautan Cepat</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { label: 'Beranda', id: 'home' },
                  { label: 'Tentang Kami', id: 'tentang' },
                  { label: 'Program Keahlian', id: 'program' },
                  { label: 'PPDB', id: 'ppdb' },
                  { label: 'Berita', id: 'berita' },
                  { label: 'Kontak', id: 'kontak' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-blue-200 hover:text-yellow-500 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-yellow-500">Program Keahlian</h4>
              <ul className="space-y-2 sm:space-y-3 text-blue-200 text-sm sm:text-base">
                <li>Desain Komunikasi Visual (DKV)</li>
                <li>Teknik Komputer & Jaringan (TKJ)</li>
                <li>Tata Kecantikan (KC)</li>
                <li>Bisnis Digital Pemasaran (BDP)</li>
                <li>Akuntansi (AK)</li>
                <li>Manajemen Perkantoran (MPLB)</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-yellow-500">Hubungi Kami</h4>
              <ul className="space-y-3 sm:space-y-4 text-blue-200 text-sm sm:text-base">
                <li className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-yellow-500" />
                  <span>Jl. Tamrin No.48, Caruban, Wonoasri, Madiun</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span>085158333064 (WhatsApp)</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span>info@smkpgriwonoasri.sch.id</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-blue-200 text-xs sm:text-sm">
            <p>&copy; 2025 SMK PGRI Wonoasri. All rights reserved. | Terakreditasi A</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
}
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

