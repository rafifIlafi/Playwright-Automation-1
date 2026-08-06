import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedSettings() {
  console.log('🌱 Starting settings seed...')

  const settings = [
    // Informasi Sekolah
    { key: 'school_name', value: 'SMKS PGRI Wonoasri' },
    { key: 'school_accreditation', value: 'Terakreditasi A' },
    { key: 'school_address', value: 'Jl. Tamrin No.48, Caruban, Purwosari, Kec. Wonoasri, Kab. Madiun, Jawa Timur 63157' },
    { key: 'school_phone', value: '085158333064' },
    { key: 'school_email', value: 'info@smkpgriwonoasri.sch.id' },

    // Visi & Misi
    { key: 'vision_text', value: 'Meningkatkan kecerdasan, Menanamkan karakter baik, melatih ketrampilan untuk berwirausaha dan siap memasuki di dunia kerja serta melanjutkan ke jenjang lebih tinggi sesuai dengan kejuruan.' },
    { key: 'mission_1', value: 'Menyiapkan siswa untuk berpikir secara positif, kreatif dan bernalar kritis' },
    { key: 'mission_2', value: 'Meningkatkan perkembangan kepribadian siswa, agar dapat berdisiplin, jujur, bertanggung jawab, percaya diri, mandiri dan berperilaku sopan' },
    { key: 'mission_3', value: 'Memiliki dan mengembangkan skill sesuai dengan kompetensi keahlian dunia kerja, dan dunia wirausaha' },
    { key: 'mission_4', value: 'Menyiapkan siswa melanjutkan ke perguruan tinggi' },

    // Program Keahlian
    { key: 'program_dkv_title', value: 'Desain Komunikasi Visual (DKV)' },
    { key: 'program_dkv_desc', value: 'Mempelajari desain grafis, fotografi, videografi, animasi, dan multimedia untuk kreatif industri.' },
    { key: 'program_tkj_title', value: 'Teknik Komputer & Jaringan (TKJ)' },
    { key: 'program_tkj_desc', value: 'Mempelajari perakitan komputer, instalasi jaringan, administrasi server, dan keamanan jaringan.' },
    { key: 'program_kc_title', value: 'Tata Kecantikan (KC)' },
    { key: 'program_kc_desc', value: 'Fokus pada keahlian tata rias wajah, perawatan kulit, hair styling, dan manajemen kecantikan.' },
    { key: 'program_bdp_title', value: 'Bisnis Digital Pemasaran (BDP)' },
    { key: 'program_bdp_desc', value: 'Belajar strategi pemasaran digital, social media marketing, e-commerce, dan analisis bisnis.' },
    { key: 'program_ak_title', value: 'Akuntansi (AK)' },
    { key: 'program_ak_desc', value: 'Menguasai pembukuan, perpajakan, analisis keuangan, dan aplikasi akuntansi berbasis komputer.' },
    { key: 'program_mplb_title', value: 'Manajemen Perkantoran & Layanan Bisnis (MPLB)' },
    { key: 'program_mplb_desc', value: 'Kompetensi dalam administrasi perkantoran, kearsipan, pelayanan prima, dan manajemen bisnis.' },

    // Fasilitas Unggulan
    { key: 'facility_1', value: 'Free WiFi 24 Jam' },
    { key: 'facility_2', value: 'Studio Musik' },
    { key: 'facility_3', value: 'Multimedia Center' },
    { key: 'facility_4', value: 'Lab. Tiap Jurusan' },
    { key: 'facility_5', value: 'Perpustakaan' },
    { key: 'facility_6', value: 'Musholla' },
    { key: 'facility_7', value: 'Lapangan Olahraga' },
    { key: 'facility_8', value: 'Aula Serbaguna' },

    // Ekstrakurikuler
    { key: 'ekstrakurikuler_1', value: 'Pramuka' },
    { key: 'ekstrakurikuler_2', value: 'Hadroh' },
    { key: 'ekstrakurikuler_3', value: 'Kelas Bahasa Jepang' },
    { key: 'ekstrakurikuler_4', value: 'Volly' },
    { key: 'ekstrakurikuler_5', value: 'Seni Tari' },
    { key: 'ekstrakurikuler_6', value: 'Karawitan' },
    { key: 'ekstrakurikuler_7', value: 'Pencak Seni' },
    { key: 'ekstrakurikuler_8', value: 'Pik-R' },

    // Program Unggulan
    { key: 'program_unggulan_title', value: 'Hybrid Learning' },
    { key: 'program_unggulan_desc', value: 'Metode pembelajaran inovatif yang menggabungkan berbagai pendekatan untuk hasil maksimal' },
    { key: 'feature_1', value: 'Terakreditasi A' },
    { key: 'feature_2', value: 'Waktu Belajar Fleksibel' },
    { key: 'feature_3', value: 'Banyak Pilihan Jurusan' },
    { key: 'feature_4', value: 'Belajar Proyek Nyata' },
    { key: 'feature_5', value: 'Koneksi Luas ke Dunia Kerja' },
    { key: 'feature_6', value: 'Lingkungan Positif Kolaboratif' },
    { key: 'feature_7', value: 'Sertifikat BNSP' },
    { key: 'feature_8', value: 'Skill Digital & Microcredentials' },

    // PPDB/SPMB
    { key: 'ppdb_tahap2_period', value: '1 Desember 2025 - 28 Februari 2026' },
    { key: 'ppdb_tahap2_benefit', value: 'Gratis 2 bulan biaya belajar, Potongan seragam hingga 20%' },
    { key: 'ppdb_tahap3_period', value: '1 Maret 2026 - 31 Mei 2026' },
    { key: 'ppdb_tahap3_benefit', value: 'Gratis biaya belajar 1 bulan, Fasilitas lengkap' },
    { key: 'scholarship_1', value: 'Beasiswa Jalur Prestasi - Untuk siswa dengan prestasi akademik atau non-akademik yang luar biasa' },
    { key: 'scholarship_2', value: 'Beasiswa Potensi - Untuk siswa dengan potensi dan bakat yang berkembang' },
    { key: 'scholarship_3', value: 'Beasiswa Yatim Piatu - Untuk siswa yatim piatu atau orang tua asuh yang membutuhkan' },

    // Kontak & Sosial Media
    { key: 'contact_whatsapp', value: '085158333064' },
    { key: 'contact_tiktok', value: 'https://www.tiktok.com/@smkpgriwonoasri' },
    { key: 'contact_instagram', value: 'https://www.instagram.com/@smkpgriwonoasri' },
    { key: 'contact_youtube', value: 'https://www.youtube.com/@smkpgriwonoasri8087' },
    { key: 'contact_maps', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.314562603578!2d111.54292627469316!3d-7.625530992472573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79c28b74e7809d%3A0x4a4b4e4a4b4e4a4b!2sJl.%20Tamrin%20No.48%2C%20Caruban%2C%20Purwosari%2C%20Kec.%20Wonoasri%2C%20Kab.%20Madiun%2C%20Jawa%20Timur%2063157!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid' },

    // Footer
    { key: 'footer_about', value: 'Mencetak generasi muda yang kompeten, berkarakter mulia, dan siap bersaing di dunia kerja serta berwirausaha.' }
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
    console.log(`✅ Seeded: ${setting.key}`)
  }

  console.log('🎉 Settings seed completed!')
}

async function main() {
  try {
    await seedSettings()
  } catch (error) {
    console.error('❌ Error seeding settings:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
