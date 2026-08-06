import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyActive = searchParams.get('active') === 'true'

    if (onlyActive) {
      const dokumen = await db.dokumenKegiatan.findFirst({
        where: { status: true },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(dokumen)
    }

    const dokumen = await db.dokumenKegiatan.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(dokumen)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { judulKegiatan, deskripsi, fileJuklak, fileJuknis, status } = body

    if (status === true) {
      await db.dokumenKegiatan.updateMany({
        where: { status: true },
        data: { status: false }
      })
    }

    const dokumen = await db.dokumenKegiatan.create({
      data: {
        judulKegiatan,
        deskripsi,
        fileJuklak: fileJuklak || null,
        fileJuknis: fileJuknis || null,
        status: status || false
      }
    })

    return NextResponse.json(dokumen, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
