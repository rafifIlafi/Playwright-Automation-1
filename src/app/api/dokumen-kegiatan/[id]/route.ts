import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const dokumen = await db.dokumenKegiatan.findUnique({
      where: { id }
    })

    if (!dokumen) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(dokumen)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { judulKegiatan, deskripsi, fileJuklak, fileJuknis, status } = body

    if (status === true) {
      await db.dokumenKegiatan.updateMany({
        where: {
          AND: [
            { status: true },
            { id: { not: id } }
          ]
        },
        data: { status: false }
      })
    }

    const dokumen = await db.dokumenKegiatan.update({
      where: { id },
      data: {
        ...(judulKegiatan !== undefined && { judulKegiatan }),
        ...(deskripsi !== undefined && { deskripsi }),
        ...(fileJuklak !== undefined && { fileJuklak }),
        ...(fileJuknis !== undefined && { fileJuknis }),
        ...(status !== undefined && { status })
      }
    })

    return NextResponse.json(dokumen)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.dokumenKegiatan.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
