'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, Target, Award, BookOpen, Briefcase, Building2, Trophy, Shield, Quote, Network, Cpu, Monitor, Wifi, Lock, Database, Globe, Settings, HardDrive, Server, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ProgramContent {
  gallery_1?: string
  gallery_2?: string
  gallery_3?: string
  gallery_4?: string
  gallery_5?: string
  gallery_6?: string
  gallery_7?: string
  gallery_8?: string
}

export default function TKJPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [programContent, setProgramContent] = useState<ProgramContent>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchProgramContent = async () => {
      try {
        const response = await fetch('/api/program-content/tkj')
        if (response.ok) {
          const data = await response.json()
          setProgramContent(data)
        }
      } catch (error) {
        console.error('Error fetching program content:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProgramContent()
  }, [])

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
          <div className="flex justify-between items-center h-20">
            <Link href="/" className={`flex items-center gap-2 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              <GraduationCap className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">SMKS PGRI Wonoasri</h1>
                <p className={`text-xs ${isScrolled ? 'text-foreground/70' : 'text-white/80'}`}>
                  Teknik Komputer & Jaringan
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                isScrolled
                  ? 'bg-blue-900 hover:bg-blue-800 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTR2NGg0djR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-semibold mb-6">
            <Network className="w-4 h-4" />
            PROGRAM KEAHLIAN
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Teknik Komputer & Jaringan
          </h1>
          <p className="text-xl md:text-2xl text-yellow-400 mb-6">
            (TKJ)
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Mencetak ahli teknologi informasi yang kompeten di bidang jaringan komputer, server, dan keamanan jaringan
          </p>
        </div>
      </section>

      {/* Deskripsi Singkat */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-yellow-500" />
                Deskripsi Singkat
              </h2>
              <p className="text-lg leading-relaxed">
                Program Keahlian Teknik Komputer & Jaringan (TKJ) SMKS PGRI Wonoasri dirancang untuk mencetak
                lulusan yang kompeten di bidang perakitan komputer, instalasi jaringan, konfigurasi server,
                keamanan jaringan, dan teknologi internet. Siswa akan belajar menguasai berbagai teknologi
                jaringan modern, konfigurasi perangkat jaringan (Cisco, MikroTik), dan keamanan siber.
                Program ini menggabungkan teori dengan praktik intensif untuk mempersiapkan siswa menjadi
                teknisi jaringan profesional yang siap bekerja di berbagai sektor industri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi dan Tujuan */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Visi</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed text-lg">
                Menjadi program keahlian TKJ unggulan yang menghasilkan lulusan berkompeten, terampil,
                inovatif, dan berkarakter dalam bidang teknologi komputer dan jaringan yang diakui
                di tingkat nasional maupun internasional.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold">Tujuan</h3>
              </div>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">✓</span>
                  <span>Mencetak lulusan yang mampu mengelola jaringan komputer secara profesional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">✓</span>
                  <span>Mengembangkan keahlian dalam konfigurasi server dan keamanan jaringan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">✓</span>
                  <span>Mempersiapkan siswa untuk bersaing di industri IT dan telekomunikasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">✓</span>
                  <span>Menanamkan etika profesional dalam praktik teknologi informasi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Kompetensi yang Dipelajari */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Kompetensi yang Dipelajari</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Perakitan Komputer', icon: <Cpu className="w-5 h-5" /> },
              { name: 'Instalasi OS & Software', icon: <Monitor className="w-5 h-5" /> },
              { name: 'Jaringan Dasar & LAN', icon: <Network className="w-5 h-5" /> },
              { name: 'Konfigurasi Router & Switch', icon: <Settings className="w-5 h-5" /> },
              { name: 'Administrasi Server', icon: <Server className="w-5 h-5" /> },
              { name: 'Keamanan Jaringan', icon: <Lock className="w-5 h-5" /> },
              { name: 'Administrasi Database', icon: <Database className="w-5 h-5" /> },
              { name: 'Fiber Optic & Kabel', icon: <Wifi className="w-5 h-5" /> },
              { name: 'Web Server & Hosting', icon: <Globe className="w-5 h-5" /> },
              { name: 'Maintenance & Troubleshooting', icon: <HardDrive className="w-5 h-5" /> },
              { name: 'Wireless Networking', icon: <Wifi className="w-5 h-5" /> },
              { name: 'Cloud Computing Dasar', icon: <Server className="w-5 h-5" /> }
            ].map((competence, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 rounded-xl p-6 border-2 border-blue-100 dark:border-blue-800 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <span className="font-semibold text-foreground">{competence.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mata Pelajaran Produktif Utama */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mata Pelajaran Produktif Utama</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Sistem Komputer', desc: 'Arsitektur komputer dan perangkat keras' },
              { name: 'Jaringan Dasar', desc: 'Konsep dasar jaringan dan topologi' },
              { name: 'Administrasi Sistem Jaringan', desc: 'Manajemen jaringan dan perangkat aktif' },
              { name: 'Administrasi Server', desc: 'Konfigurasi server Windows dan Linux' },
              { name: 'Keamanan Jaringan', desc: 'Implementasi keamanan dan firewall' },
              { name: 'Teknologi Layanan Jaringan', desc: 'Layanan jaringan dan aplikasi server' },
              { name: 'Produk Kreatif & Kewirausahaan', desc: 'Bisnis di bidang IT dan jaringan' },
              { name: 'Praktik Kerja Lapangan (PKL)', desc: 'Pengalaman kerja di industri IT' }
            ].map((subject, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{subject.name}</h3>
                    <p className="text-foreground/70">{subject.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peluang Kerja & Kuliah */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-900 text-white rounded-full text-lg font-bold mb-4">
                  <Briefcase className="w-6 h-6" />
                  Peluang Kerja
                </div>
                <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
              </div>

              <div className="space-y-4">
                {[
                  'Network Engineer',
                  'System Administrator',
                  'Network Administrator',
                  'IT Support Specialist',
                  'Server Administrator',
                  'Security Engineer',
                  'Network Technician',
                  'Cloud Engineer',
                  'Data Center Technician',
                  'Wireless Network Engineer',
                  'DevOps Engineer',
                  'IT Consultant'
                ].map((job, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl p-4 flex items-center gap-3 hover:shadow-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium">{job}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold mb-4">
                  <GraduationCap className="w-6 h-6" />
                  Peluang Kuliah
                </div>
                <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full" />
              </div>

              <div className="space-y-4">
                {[
                  'Teknik Informatika (S1/D3)',
                  'Teknik Komputer (S1/D3)',
                  'Sistem Komputer (S1/D3)',
                  'Teknik Elektro (S1/D3)',
                  'Teknik Telekomunikasi (S1/D3)',
                  'Sistem Informasi (S1/D3)',
                  'Teknologi Informasi (S1/D3)',
                  'Keamanan Siber (S1/D3)',
                  'Ilmu Komputer (S1/D3)',
                  'Manajemen Informatika (D3)',
                  'Rekayasa Perangkat Lunak (S1/D3)',
                  'Teknik Industri (S1)'
                ].map((major, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-xl p-4 flex items-center gap-3 border-2 border-yellow-200 hover:border-yellow-500 transition-all"
                  >
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-foreground">{major}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mitra Industri */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-900 text-white rounded-full text-lg font-bold mb-6">
              <Building2 className="w-6 h-6" />
              Mitra Industri & Tempat PKL
            </div>
            <h2 className="text-4xl font-bold mb-4">Kerjasama Industri</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-lg text-foreground/70 mt-6 max-w-3xl mx-auto">
              Siswa TKJ memiliki kesempatan PKL di berbagai perusahaan teknologi dan telekomunikasi terkemuka
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'ISP Lokal', type: 'Internet Service Provider' },
              { name: 'PT Telkom Indonesia', type: 'Telekomunikasi' },
              { name: 'Perusahaan Data Center', type: 'Data Center Services' },
              { name: 'Integrator Jaringan', type: 'Network Solutions' },
              { name: 'Vendor IT & Komputer', type: 'IT Services' },
              { name: 'Perusahaan Telekomunikasi', type: 'Telecom Operator' },
              { name: 'Start-up Teknologi', type: 'Tech Company' },
              { name: 'Instansi Pemerintah', type: 'Government IT' },
              { name: 'Bank & Lembaga Keuangan', type: 'Financial IT' }
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-7 h-7 text-yellow-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">{partner.name}</h3>
                <p className="text-foreground/70">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Laboratorium */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Fasilitas Laboratorium & Workshop</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Lab Jaringan Komputer', icon: <Network className="w-6 h-6" /> },
              { name: 'Lab Perakitan Komputer', icon: <Cpu className="w-6 h-6" /> },
              { name: 'Lab Server', icon: <Server className="w-6 h-6" /> },
              { name: 'Lab Keamanan Jaringan', icon: <Lock className="w-6 h-6" /> },
              { name: 'Lab Fiber Optic', icon: <Wifi className="w-6 h-6" /> },
              { name: 'Workshop Hardware', icon: <HardDrive className="w-6 h-6" /> },
              { name: 'Peralatan Jaringan Lengkap', icon: <Settings className="w-6 h-6" /> },
              { name: 'Lab Wireless', icon: <Wifi className="w-6 h-6" /> },
              { name: 'Mini Data Center', icon: <Database className="w-6 h-6" /> }
            ].map((facility, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    {facility.icon}
                  </div>
                  <span className="font-semibold text-foreground">{facility.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestasi & Karya Siswa */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold mb-6">
              <Trophy className="w-6 h-6" />
              Prestasi & Karya
            </div>
            <h2 className="text-4xl font-bold mb-4">Prestasi dan Karya Siswa</h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-yellow-600 dark:text-yellow-500">Prestasi</h3>
              <div className="space-y-4">
                {[
                  'Juara 1 LKS Network System Administration Tingkat Kabupaten 2024',
                  'Juara 2 LKS Cyber Security Tingkat Provinsi 2024',
                  'Juara Harapan 1 Lomba IT Network Tingkat Jawa Timur 2023',
                  'Finalis LKS IT Network System Support Tingkat Nasional 2023',
                  'Juara 1 Kompetisi Konfigurasi MikroTik 2023'
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-700 rounded-lg"
                  >
                    <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-500">Proyek Siswa</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Setup Hotspot', icon: <Wifi className="w-8 h-8" /> },
                  { name: 'Konfigurasi VPN', icon: <Lock className="w-8 h-8" /> },
                  { name: 'Web Server', icon: <Server className="w-8 h-8" /> },
                  { name: 'Network Topo', icon: <Network className="w-8 h-8" /> },
                  { name: 'MikroTik Config', icon: <Settings className="w-8 h-8" /> },
                  { name: 'Database Setup', icon: <Database className="w-8 h-8" /> }
                ].map((project, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl flex flex-col items-center justify-center gap-2 group hover:shadow-lg transition-all p-4"
                  >
                    {project.icon}
                    <span className="text-sm font-medium text-blue-900/70 dark:text-blue-300 text-center">
                      {project.name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-foreground/60 text-sm mt-4 text-center">
                Galeri proyek jaringan siswa TKJ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sertifikasi */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-900 text-white rounded-full text-lg font-bold mb-6">
              <Shield className="w-6 h-6" />
              Sertifikasi
            </div>
            <h2 className="text-4xl font-bold mb-4">Sertifikasi yang Bisa Diperoleh</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'MikroTik Certified Network Associate', level: 'MTCNA', desc: 'Sertifikasi MikroTik resmi' },
              { name: 'Cisco Certified Network Associate', level: 'CCNA', desc: 'Sertifikasi Cisco resmi' },
              { name: 'BNSP SKKNI Teknik Komputer', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
              { name: 'BNSP SKKNI Jaringan', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
              { name: 'CompTIA Network+', level: 'N10-008', desc: 'Sertifikasi internasional' },
              { name: 'Junior Network Administrator', level: 'BNSP Level 2', desc: 'Sertifikasi kompetensi nasional' }
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 dark:border-blue-800"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                <p className="text-yellow-600 dark:text-yellow-500 font-semibold mb-2">{cert.level}</p>
                <p className="text-foreground/70 text-sm">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Kegiatan */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Galeri Kegiatan Jurusan</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="text-lg text-foreground/70 mt-6 max-w-3xl mx-auto">
              Dokumentasi kegiatan dan pembelajaran siswa TKJ
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                const imageUrl = programContent[`gallery_${item}` as keyof ProgramContent] as string
                return (
                  <div
                    key={item}
                    className="aspect-square bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={`Galeri TKJ ${item}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-blue-900/50 group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-white rounded-full text-lg font-bold mb-6">
              <Quote className="w-6 h-6" />
              Testimoni
            </div>
            <h2 className="text-4xl font-bold mb-4">Kata Alumni & Siswa</h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Denny Setiawan',
                year: 'Angkatan 2021',
                role: 'Network Engineer di Surabaya',
                text: 'Program TKJ memberikan fondasi yang sangat kuat untuk karir saya di bidang jaringan. Praktik intensif dan sertifikasi MikroTik sangat membantu.'
              },
              {
                name: 'Rina Kusuma',
                year: 'Angkatan 2022',
                role: 'Mahasiswa Teknik Informatika ITS',
                text: 'Ilmu jaringan dan server yang saya pelajari sangat berguna saat kuliah. Fasilitas lab lengkap dan dukungan guru yang profesional.'
              },
              {
                name: 'Budi Santoso',
                year: 'Siswa Kelas XII',
                role: 'Siswa Aktif',
                text: 'Belajar di TKJ sangat menantang dan menyenangkan. Banyak praktik langsung yang membuat saya siap kerja setelah lulus.'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <Quote className="w-7 h-7 text-white" />
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-yellow-600 dark:text-yellow-500 font-medium">{testimonial.year}</p>
                  <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Siap Menjadi Ahli Jaringan Komputer?</h2>
          <p className="text-xl text-yellow-400 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan Program Keahlian Teknik Komputer & Jaringan SMKS PGRI Wonoasri dan wujudkan karir di dunia IT!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#ppdb"
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-xl"
            >
              Daftar Sekarang
            </a>
            <Link
              href="/"
              className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold rounded-xl transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200">
            © 2025 SMKS PGRI Wonoasri - Program Keahlian Teknik Komputer & Jaringan
          </p>
        </div>
      </footer>
    </div>
  )
}
