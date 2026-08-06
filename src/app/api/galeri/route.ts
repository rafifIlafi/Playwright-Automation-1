import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const galeri = await db.galeri.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    return NextResponse.json(galeri)
  } catch (error) {
    console.error('Error fetching galeri:', error)
    return NextResponse.json(
      { error: 'Gagal memuat galeri' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { judul, gambar } = body

    if (!judul || !gambar) {
      return NextResponse.json(
        { error: 'Judul and gambar wajib diisi' },
        { status: 400 }
      )
    }

    const galeri = await db.galeri.create({
      data: {
        judul,
        gambar
      }
    })

    return NextResponse.json(galeri, { status: 201 })
  } catch (error) {
    console.error('Error creating galeri:', error)
    return NextResponse.json(
      { error: 'Gagal membuat galeri' },
      { status: 500 }
    )
  }
}
