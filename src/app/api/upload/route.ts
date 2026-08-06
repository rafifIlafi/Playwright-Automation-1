import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_DOCUMENT_TYPES = ['application/pdf']
const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WEBP, and PDF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${uuidv4()}.${fileExtension}`
    
    // Determine upload directory based on file type
    const folderParam = formData.get('folder') as string
    let uploadDir: string
    let fileUrl: string
    
    if (ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
      // Store PDF files in 'dokumen' folder
      uploadDir = join(process.cwd(), 'public', 'uploads', 'dokumen')
      fileUrl = `/uploads/dokumen/${uniqueFilename}`
    } else if (folderParam === 'dokumen') {
      // Use specified folder for images if needed
      uploadDir = join(process.cwd(), 'public', 'uploads', 'dokumen')
      fileUrl = `/uploads/dokumen/${uniqueFilename}`
    } else {
      // Default to 'programs' folder for images
      uploadDir = join(process.cwd(), 'public', 'uploads', 'programs')
      fileUrl = `/uploads/programs/${uniqueFilename}`
    }
    
    const filePath = join(uploadDir, uniqueFilename)

    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true })

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename: uniqueFilename
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
