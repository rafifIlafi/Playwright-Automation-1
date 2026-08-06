import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const berita = await db.berita.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Error fetching berita:', error)
    return NextResponse.json(
      { error: 'Failed to fetch berita' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { judul, isi, gambar } = body

    if (!judul || !isi) {
      return NextResponse.json(
        { error: 'Judul dan isi are required' },
        { status: 400 }
      )
    }

    const berita = await db.berita.create({
      data: {
        judul,
        isi,
        gambar
      }
    })

    return NextResponse.json(berita, { status: 201 })
  } catch (error) {
    console.error('Error creating berita:', error)
    return NextResponse.json(
      { error: 'Failed to create berita' },
      { status: 500 }
    )
  }
}
