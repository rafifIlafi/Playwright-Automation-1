import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('Created admin user:', admin.username)

  // Create user cleo
  const hashedPasswordCleo = await bcrypt.hash('cleo123', 10)

  const cleo = await prisma.user.upsert({
    where: { username: 'cleo' },
    update: {},
    create: {
      username: 'cleo',
      password: hashedPasswordCleo,
      role: 'admin',
    },
  })

  console.log('Created admin user:', cleo.username)

  // Create sample berita
  const berita1 = await prisma.berita.upsert({
    where: { id: 'sample-berita-1' },
    update: {},
    create: {
      id: 'sample-berita-1',
      judul: 'Siswa SMK Bimari Juara 1 LKS Tingkat Provinsi',
      isi: 'Siswa jurusan Rekayasa Perangkat Lunak berhasil meraih juara pertama dalam kompetisi LKS (Lomba Kompetensi Siswa) tingkat provinsi. Prestasi ini membuktikan kualitas pendidikan di SMK Bimari yang terus berkomitmen mencetak generasi unggul dan berkompeten.',
      gambar: null,
    },
  })

  const berita2 = await prisma.berita.upsert({
    where: { id: 'sample-berita-2' },
    update: {},
    create: {
      id: 'sample-berita-2',
      judul: 'Kunjungan Industri ke Perusahaan Teknologi',
      isi: 'Siswa kelas XII melakukan kunjungan industri ke perusahaan teknologi terkemuka untuk mengenal langsung dunia kerja. Kunjungan ini bertujuan untuk memberikan wawasan praktis tentang industri dan mempersiapkan siswa untuk memasuki dunia kerja.',
      gambar: null,
    },
  })

  const berita3 = await prisma.berita.upsert({
    where: { id: 'sample-berita-3' },
    update: {},
    create: {
      id: 'sample-berita-3',
      judul: 'Penerimaan Siswa Baru Tahun Ajaran 2025/2026',
      isi: 'SMK Bimari membuka pendaftaran siswa baru dengan berbagai program keahlian unggulan. Segera daftarkan diri Anda dan jadilah bagian dari generasi unggul yang berkarakter dan berprestasi.',
      gambar: null,
    },
  })

  console.log('Created sample berita:', berita1.judul, berita2.judul, berita3.judul)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
