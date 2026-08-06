'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Search, Filter, Home, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface Berita {
  id: string
  judul: string
  isi: string
  gambar: string
  createdAt: string
  updatedAt: string
}

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const ITEMS_PER_PAGE = 9

  useEffect(() => {
    fetchBerita()
  }, [])

  const fetchBerita = async () => {
    try {
      const response = await fetch('/api/berita')
      if (response.ok) {
        const data = await response.json()
        setBeritaList(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching berita:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter berita based on search query
  const filteredBerita = beritaList.filter(berita =>
    berita.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    berita.isi.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredBerita.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentBerita = filteredBerita.slice(startIndex, endIndex)

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          variant={currentPage === i ? 'default' : 'outline'}
          size="sm"
          className={currentPage === i ? 'bg-blue-900 hover:bg-blue-800' : ''}
        >
          {i}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Clock className="w-3 h-3 mr-1" />
              Berita Terkini
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita Sekolah</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Dapatkan informasi terbaru dan terpercaya dari SMKS PGRI Wonoasri
            </p>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/">
                <Button variant="ghost" className="gap-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                  <Home className="w-4 h-4" />
                  Beranda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Berita Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardHeader>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : currentBerita.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tidak Ada Berita</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? `Tidak ada berita yang cocok dengan pencarian "${searchQuery}"`
                : 'Belum ada berita yang tersedia saat ini.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentBerita.map((berita) => (
                <Link key={berita.id} href={`/berita/${berita.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col cursor-pointer group">
                    {berita.gambar ? (
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={berita.gambar}
                          alt={berita.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <Badge className="bg-blue-900 hover:bg-blue-800">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(berita.createdAt)}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                        <div className="text-center p-4">
                          <p className="text-4xl mb-2">📰</p>
                          <p className="text-sm text-muted-foreground">SMK PGRI Wonoasri</p>
                        </div>
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-900 transition-colors">
                        {berita.judul}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {formatDate(berita.createdAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {truncateContent(stripHtml(berita.isi), 120)}
                      </p>
                      <div className="mt-4 flex items-center text-blue-900 font-medium text-sm group-hover:gap-3 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  Sebelumnya
                </Button>

                <div className="flex gap-2 flex-wrap justify-center">
                  {renderPageNumbers()}
                </div>

                <Button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  Selanjutnya
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
