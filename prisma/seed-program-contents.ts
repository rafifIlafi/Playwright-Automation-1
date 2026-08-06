import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedProgramContents() {
  console.log('🌱 Starting program contents seed...')

  const programs = [
    {
      programCode: 'dkv',
      title: 'Desain Komunikasi Visual (DKV)',
      description: 'Program Keahlian Desain Komunikasi Visual (DKV) SMKS PGRI Wonoasri dirancang untuk mencetak lulusan yang kompeten di bidang desain grafis, fotografi, videografi, animasi, dan multimedia. Siswa akan belajar menguasai berbagai software industri standar seperti Adobe Photoshop, Illustrator, After Effects, Premiere Pro, dan lainnya.',
      vision: 'Menjadi program keahlian DKV unggulan yang menghasilkan lulusan berkompeten, kreatif, inovatif, dan berkarakter dalam bidang desain komunikasi visual yang diakui di tingkat nasional maupun internasional.',
      goals: JSON.stringify([
        'Mencetak lulusan yang mampu menciptakan karya desain berkualitas tinggi',
        'Mengembangkan kreativitas dan kemampuan berpikir visual siswa',
        'Mempersiapkan siswa untuk bersaing di industri kreatif digital',
        'Menanamkan etika profesional dalam praktik desain'
      ]),
      competencies: JSON.stringify([
        'Prinsip & Elemen Desain',
        'Tipografi & Layout',
        'Desain Grafis Digital',
        'Ilustrasi Digital',
        'Fotografi Produk & Portrait',
        'Videografi & Editing',
        'Animasi 2D & 3D',
        'Motion Graphics',
        'Desain UI/UX',
        'Branding & Identitas Visual',
        'Packaging Design',
        'Digital Marketing Visuals'
      ]),
      subjects: JSON.stringify([
        { name: 'Dasar Desain Grafis', desc: 'Memahami prinsip dasar desain dan komposisi visual' },
        { name: 'Ilustrasi Digital', desc: 'Membuat ilustrasi menggunakan software digital' },
        { name: 'Fotografi', desc: 'Teknik fotografi dasar hingga lanjut' },
        { name: 'Videografi', desc: 'Teknik pengambilan dan editing video' },
        { name: 'Animasi 2D', desc: 'Pembuatan animasi frame by frame dan rigging' },
        { name: 'Web Design', desc: 'Desain tampilan website dan interface' },
        { name: 'Branding', desc: 'Pembuatan identitas visual dan brand guidelines' },
        { name: 'Praktik Kerja Lapangan (PKL)', desc: 'Pengalaman kerja di industri kreatif' }
      ]),
      jobs: JSON.stringify([
        'Graphic Designer',
        'UI/UX Designer',
        'Visual Communication Designer',
        'Photographer',
        'Videographer & Video Editor',
        'Motion Designer',
        'Illustrator',
        'Brand Designer',
        'Web Designer',
        'Art Director',
        'Creative Director',
        'Freelance Designer'
      ]),
      majors: JSON.stringify([
        'Desain Komunikasi Visual (S1/D3)',
        'Desain Grafis (S1/D3)',
        'Desain Interior (S1/D3)',
        'Seni Rupa & Desain (S1/D3)',
        'Animasi (S1/D3)',
        'Multimedia (S1/D3)',
        'Ilustrasi (S1/D3)',
        'Film & Televisi (S1/D3)',
        'Periklanan (S1/D3)',
        'Manajemen Seni (S1/D3)',
        'Komunikasi Visual (S1/D3)',
        'Kriya Tekstil (S1/D3)'
      ]),
      partners: JSON.stringify([
        { name: 'Studio Desain Grafis', type: 'Creative Agency' },
        { name: 'Percetakan Digital', type: 'Printing Industry' },
        { name: 'Agensi Periklanan', type: 'Advertising Agency' },
        { name: 'Studio Fotografi', type: 'Photography Studio' },
        { name: 'Production House', type: 'Video Production' },
        { name: 'Perusahaan Media', type: 'Media Company' },
        { name: 'Studio Animasi', type: 'Animation Studio' },
        { name: 'E-commerce Company', type: 'Digital Business' },
        { name: 'Startup Digital', type: 'Tech Startup' }
      ]),
      facilities: JSON.stringify([
        'Laboratorium Komputer Desain',
        'Studio Fotografi Profesional',
        'Studio Videografi',
        'Laboratorium Editing',
        'Ruang Animasi',
        'Workshop Kreatif',
        'Peralatan Fotografi Lengkap',
        'Green Room Studio',
        'Perpustakaan Desain'
      ]),
      achievements: JSON.stringify([
        'Juara 1 LKS Desain Grafis Tingkat Kabupaten 2024',
        'Juara 2 Lomba Poster Digital Tingkat Provinsi 2024',
        'Juara Harapan 1 Kompetisi Fotografi Tingkat Jawa Timur 2023',
        'Finalis LKS Animasi Tingkat Nasional 2023',
        'Juara 1 Lomba Video Konten Edukasi 2023'
      ]),
      certifications: JSON.stringify([
        { name: 'Adobe Certified Professional', level: 'Photoshop', desc: 'Sertifikasi Adobe resmi' },
        { name: 'Adobe Certified Professional', level: 'Illustrator', desc: 'Sertifikasi Adobe resmi' },
        { name: 'Adobe Certified Professional', level: 'Premiere Pro', desc: 'Sertifikasi Adobe resmi' },
        { name: 'BNSP SKKNI Desain Grafis', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'BNSP SKKNI Fotografi', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'BNSP SKKNI Animasi', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' }
      ]),
      gallery: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
      testimonials: JSON.stringify([
        {
          name: 'Rizky Pratama',
          year: 'Angkatan 2021',
          role: 'Graphic Designer di Jakarta',
          text: 'Program DKV di SMK PGRI Wonoasri memberikan fondasi yang kuat untuk karir saya di industri kreatif. Fasilitas lengkap dan guru yang berpengalaman sangat membantu.'
        },
        {
          name: 'Putri Ayu',
          year: 'Angkatan 2022',
          role: 'Mahasiswa DKV ISI Yogyakarta',
          text: 'Ilmu yang saya dapatkan sangat berguna saat kuliah. Siswa diajar dari dasar hingga mahir dengan praktik yang intensif.'
        },
        {
          name: 'Ahmad Fauzi',
          year: 'Siswa Kelas XII',
          role: 'Siswa Aktif',
          text: 'Belajar di DKV sangat menyenangkan. Banyak kegiatan praktik dan kompetisi yang mengasah kemampuan desain saya.'
        }
      ])
    },
    {
      programCode: 'tkj',
      title: 'Teknik Komputer & Jaringan (TKJ)',
      description: 'Program Keahlian Teknik Komputer & Jaringan (TKJ) SMKS PGRI Wonoasri dirancang untuk mencetak tenaga teknis yang kompeten dalam perakitan komputer, instalasi jaringan, administrasi server, dan keamanan jaringan.',
      vision: 'Menjadi program keahlian TKJ unggulan yang menghasilkan lulusan berkompeten dalam teknologi jaringan dan infrastruktur IT yang diakui di industri.',
      goals: JSON.stringify([
        'Mencetak lulusan yang mahir dalam konfigurasi jaringan dan server',
        'Mengembangkan kemampuan troubleshooting hardware dan software',
        'Mempersiapkan siswa bersertifikasi industri (MikroTik, Cisco)',
        'Menanamkan etika kerja profesional di bidang IT'
      ]),
      competencies: JSON.stringify([
        'Perakitan Komputer',
        'Instalasi OS & Software',
        'Jaringan Dasar & LAN',
        'Konfigurasi Router & Switch',
        'Administrasi Server',
        'Keamanan Jaringan',
        'Administrasi Database',
        'Fiber Optic & Kabel',
        'Web Server & Hosting',
        'Maintenance & Troubleshooting',
        'Wireless Networking',
        'Cloud Computing Dasar'
      ]),
      subjects: JSON.stringify([
        { name: 'Sistem Komputer', desc: 'Memahami komponen dan cara kerja komputer' },
        { name: 'Jaringan Dasar', desc: 'Konsep dasar jaringan komputer' },
        { name: 'Administrasi Sistem Jaringan', desc: 'Manajemen sistem jaringan' },
        { name: 'Administrasi Server', desc: 'Konfigurasi dan manajemen server' },
        { name: 'Keamanan Jaringan', desc: 'Proteksi jaringan dari ancaman' },
        { name: 'Teknologi Layanan Jaringan', desc: 'Teknologi terbaru di jaringan' },
        { name: 'Produk Kreatif & Kewirausahaan', desc: 'Bisnis berbasis teknologi' },
        { name: 'Praktik Kerja Lapangan (PKL)', desc: 'Pengalaman kerja di industri IT' }
      ]),
      jobs: JSON.stringify([
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
      ]),
      majors: JSON.stringify([
        'Teknik Informatika',
        'Teknik Komputer',
        'Sistem Komputer',
        'Teknik Elektro',
        'Teknik Telekomunikasi',
        'Sistem Informasi',
        'Teknologi Informasi',
        'Keamanan Siber',
        'Ilmu Komputer',
        'Manajemen Informatika',
        'Rekayasa Perangkat Lunak',
        'Teknik Industri'
      ]),
      partners: JSON.stringify([
        { name: 'ISP Lokal', type: 'Internet Service Provider' },
        { name: 'PT Telkom Indonesia', type: 'Telecommunication' },
        { name: 'Perusahaan Data Center', type: 'Data Center' },
        { name: 'Integrator Jaringan', type: 'Network Integrator' },
        { name: 'Vendor IT & Komputer', type: 'IT Vendor' },
        { name: 'Perusahaan Telekomunikasi', type: 'Telecommunication' },
        { name: 'Start-up Teknologi', type: 'Tech Startup' },
        { name: 'Instansi Pemerintah', type: 'Government' },
        { name: 'Bank & Lembaga Keuangan', type: 'Financial' }
      ]),
      facilities: JSON.stringify([
        'Lab Jaringan Komputer',
        'Lab Perakitan Komputer',
        'Lab Server',
        'Lab Keamanan Jaringan',
        'Lab Fiber Optic',
        'Workshop Hardware',
        'Peralatan Jaringan Lengkap',
        'Lab Wireless',
        'Mini Data Center'
      ]),
      achievements: JSON.stringify([
        'Juara 1 LKS Network System Administration 2024',
        'Juara 2 Kompetisi Network Security 2024',
        'Finalis LKS Cyber Security Tingkat Nasional 2023',
        'Juara Harapan 1 Lomba Server Configuration 2023',
        'Juara 1 Kompetisi Troubleshooting Hardware 2023'
      ]),
      certifications: JSON.stringify([
        { name: 'MTCNA', level: 'MikroTik', desc: 'Sertifikasi MikroTik Certified Network Associate' },
        { name: 'CCNA', level: 'Cisco', desc: 'Cisco Certified Network Associate' },
        { name: 'BNSP SKKNI Teknik Komputer', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'BNSP SKKNI Jaringan', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'CompTIA Network+', level: 'Professional', desc: 'Sertifikasi jaringan internasional' },
        { name: 'Junior Network Administrator', level: 'Professional', desc: 'Sertifikasi administrator jaringan' }
      ]),
      gallery: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
      testimonials: JSON.stringify([
        {
          name: 'Budi Santoso',
          year: 'Angkatan 2020',
          role: 'Network Engineer di Jakarta',
          text: 'Ilmu yang saya dapatkan di TKJ sangat berguna di dunia kerja. Sertifikasi MikroTik yang saya dapatkan sangat membantu karir saya.'
        },
        {
          name: 'Siti Aminah',
          year: 'Angkatan 2021',
          role: 'System Administrator',
          text: 'Praktik di lab jaringan sangat membantu memahami konfigurasi server yang kompleks.'
        },
        {
          name: 'Rendi Pratama',
          year: 'Siswa Kelas XII',
          role: 'Siswa Aktif',
          text: 'Belajar TKJ di sini sangat asyik. Fasilitas lengkap dan guru-guru yang sangat kompeten.'
        }
      ])
    },
    {
      programCode: 'kc',
      title: 'Tata Kecantikan (KC)',
      description: 'Program Keahlian Tata Kecantikan (KC) SMKS PGRI Wonoasri dirancang untuk mencetak tenaga profesional di bidang kecantikan dan perawatan kulit dengan standar industri terkini.',
      vision: 'Menjadi program keahlian KC unggulan yang menghasilkan lulusan profesional di bidang kecantikan yang berkarakter dan berdaya saing.',
      goals: JSON.stringify([
        'Mencetak lulusan profesional di bidang tata rias dan kecantikan',
        'Mengembangkan kreativitas dalam seni kecantikan',
        'Mempersiapkan siswa dengan sertifikasi BNSP',
        'Menanamkan etika profesional di industri kecantikan'
      ]),
      competencies: JSON.stringify([
        'Tata Rias Wajah',
        'Perawatan Kulit Wajah',
        'Hair Styling & Potong Rambut',
        'Manicure & Pedicure',
        'Spa Therapy',
        'Nail Art',
        'Makeup Artist',
        'Bridal Makeup',
        'Colorist',
        'Facial Treatment',
        'Body Treatment',
        'Manajemen Bisnis Kecantikan'
      ]),
      subjects: JSON.stringify([
        { name: 'Tata Rias Wajah', desc: 'Teknik dasar hingga lanjut tata rias' },
        { name: 'Perawatan Kulit', desc: 'Ilmu perawatan dan kesehatan kulit' },
        { name: 'Hair Styling', desc: 'Teknik mencukur dan menata rambut' },
        { name: 'Manicure & Pedicure', desc: 'Perawatan kuku tangan dan kaki' },
        { name: 'Spa & Wellness', desc: 'Terapi relaksasi dan kesehatan' },
        { name: 'Makeup Artistry', desc: 'Seni rias wajah profesional' },
        { name: 'Bisnis Kecantikan', desc: 'Manajemen usaha kecantikan' },
        { name: 'Praktik Kerja Lapangan (PKL)', desc: 'Pengalaman kerja di industri kecantikan' }
      ]),
      jobs: JSON.stringify([
        'Makeup Artist',
        'Beautician',
        'Hair Stylist',
        'Nail Technician',
        'Spa Therapist',
        'Esthetician',
        'Salon Manager',
        'Bridal Makeup Artist',
        'Colorist',
        'Beauty Consultant',
        'Cosmetic Sales',
        'Entrepreneur Kecantikan'
      ]),
      majors: JSON.stringify([
        'Ilmu Kosmetik (S1/D3)',
        'Kecantikan & Estetika (S1/D3)',
        'Tata Rias (D3)',
        'Manajemen Bisnis (S1/D3)',
        'Ilmu Gizi (S1/D3)',
        'Kesehatan Kulit (S1/D3)',
        'Fashion (S1/D3)',
        'Psikologi (S1/D3)',
        'Manajemen Pemasaran (S1/D3)',
        'Akuntansi (S1/D3)',
        'Kewirausahaan (S1/D3)',
        'Hospitality (S1/D3)'
      ]),
      partners: JSON.stringify([
        { name: 'Salon Kecantikan', type: 'Beauty Salon' },
        { name: 'Spa & Wellness Center', type: 'Spa' },
        { name: 'Beauty Clinic', type: 'Beauty Clinic' },
        { name: 'Bridal Studio', type: 'Bridal Makeup' },
        { name: 'Brand Kosmetik', type: 'Cosmetics Brand' },
        { name: 'Fashion House', type: 'Fashion' },
        { name: 'Hotel Berbintang', type: 'Hospitality' },
        { name: 'Studio Foto', type: 'Photography' },
        { name: 'Event Organizer', type: 'Event Management' }
      ]),
      facilities: JSON.stringify([
        'Laboratorium Tata Rias',
        'Laboratorium Perawatan Kulit',
        'Studio Hair Styling',
        'Ruang Manicure & Pedicure',
        'Spa Room',
        'Studio Makeup',
        'Perpustakaan Kecantikan',
        'Ruang Praktik Komersial',
        'Peralatan Kecantikan Lengkap'
      ]),
      achievements: JSON.stringify([
        'Juara 1 LKS Tata Kecantikan Tingkat Kabupaten 2024',
        'Juara 2 Lomba Makeup Artist Tingkat Provinsi 2024',
        'Juara 1 Kompetisi Hair Styling 2023',
        'Finalis LKS Spa Therapy Tingkat Nasional 2023',
        'Juara Harapan 1 Lomba Nail Art 2023'
      ]),
      certifications: JSON.stringify([
        { name: 'BNSP SKKNI Tata Kecantikan', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'BNSP SKKNI Perawatan Kulit', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'Sertifikat Makeup Artist', level: 'Professional', desc: 'Sertifikasi profesional makeup' },
        { name: 'Sertifikat Hair Stylist', level: 'Professional', desc: 'Sertifikasi profesional rambut' },
        { name: 'LSP P1 Kosmetik', level: 'Professional', desc: 'Lembaga Sertifikasi Profesi' },
        { name: 'Sertifikat Spa Therapist', level: 'Professional', desc: 'Sertifikasi profesional spa' }
      ]),
      gallery: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
      testimonials: JSON.stringify([
        {
          name: 'Dewi Kartika',
          year: 'Angkatan 2020',
          role: 'Makeup Artist Profesional',
          text: 'Ilmu tata rias yang saya dapatkan sangat komprehensif. Sekarang saya sudah memiliki salon sendiri.'
        },
        {
          name: 'Rina Melati',
          year: 'Angkatan 2021',
          role: 'Spa Therapist di Bali',
          text: 'Fasilitas spa di sekolah sangat lengkap. Praktik yang intensif sangat membantu mengasah skill.'
        },
        {
          name: 'Maya Sari',
          year: 'Siswa Kelas XII',
          role: 'Siswa Aktif',
          text: 'Belajar di jurusan KC sangat menyenangkan. Banyak kesempatan untuk mengembangkan kreativitas.'
        }
      ])
    },
    {
      programCode: 'bdp',
      title: 'Bisnis Digital Pemasaran (BDP)',
      description: 'Program Keahlian Bisnis Digital Pemasaran (BDP) SMKS PGRI Wonoasri dirancang untuk mencetak lulusan yang kompeten dalam pemasaran digital, social media, e-commerce, dan bisnis online.',
      vision: 'Menjadi program keahlian BDP unggulan yang menghasilkan lulusan ahli dalam pemasaran digital dan bisnis online yang siap bersaing di era digital.',
      goals: JSON.stringify([
        'Mencetak lulusan profesional di bidang pemasaran digital',
        'Mengembangkan kemampuan analisis dan strategi bisnis',
        'Mempersiapkan siswa dengan sertifikasi digital marketing',
        'Menanamkan jiwa wirausaha dan inovatif'
      ]),
      competencies: JSON.stringify([
        'Digital Marketing Strategy',
        'Social Media Marketing',
        'SEO & SEM',
        'Content Marketing',
        'E-Commerce Management',
        'Email Marketing',
        'Paid Advertising',
        'Analytics & Data Analysis',
        'Copywriting',
        'Brand Management',
        'CRM (Customer Relationship Management)',
        'Business Development'
      ]),
      subjects: JSON.stringify([
        { name: 'Pemasaran Digital', desc: 'Konsep dan strategi pemasaran digital' },
        { name: 'Social Media Marketing', desc: 'Marketing di berbagai platform sosial' },
        { name: 'E-Commerce', desc: 'Manajemen toko online' },
        { name: 'SEO & SEM', desc: 'Optimasi mesin pencari' },
        { name: 'Content Marketing', desc: 'Pembuatan konten marketing' },
        { name: 'Analisis Bisnis Digital', desc: 'Analisis data bisnis digital' },
        { name: 'Manajemen Brand', desc: 'Pengelolaan brand digital' },
        { name: 'Praktik Kerja Lapangan (PKL)', desc: 'Pengalaman kerja di industri digital' }
      ]),
      jobs: JSON.stringify([
        'Digital Marketer',
        'Social Media Specialist',
        'SEO Specialist',
        'Content Creator',
        'E-Commerce Manager',
        'PPC Specialist',
        'Email Marketing Specialist',
        'Growth Hacker',
        'Marketing Analyst',
        'Brand Manager',
        'Digital Business Consultant',
        'Entrepreneur Digital'
      ]),
      majors: JSON.stringify([
        'Manajemen Pemasaran (S1/D3)',
        'Manajemen (S1/D3)',
        'Marketing Communication (S1/D3)',
        'Manajemen Bisnis (S1/D3)',
        'Manajemen Digital (S1/D3)',
        'Akuntansi (S1/D3)',
        'Ilmu Komunikasi (S1/D3)',
        'Periklanan (S1/D3)',
        'Hubungan Masyarakat (S1/D3)',
        'Entrepreneurship (S1/D3)',
        'Manajemen Informatika (S1/D3)',
        'Sistem Informasi (S1/D3)'
      ]),
      partners: JSON.stringify([
        { name: 'Digital Marketing Agency', type: 'Marketing Agency' },
        { name: 'Tokopedia/Shopee', type: 'E-Commerce Platform' },
        { name: 'Google Partner Agency', type: 'Google Partner' },
        { name: 'Social Media Agency', type: 'Social Media' },
        { name: 'Start-up', type: 'Technology Startup' },
        { name: 'Periklanan Digital', type: 'Digital Advertising' },
        { name: 'UMKM Digital', type: 'SME' },
        { name: 'Media Company', type: 'Media' },
        { name: 'Consulting Firm', type: 'Consulting' }
      ]),
      facilities: JSON.stringify([
        'Laboratorium Digital Marketing',
        'Studio Konten',
        'Lab E-Commerce',
        'Lab Social Media',
        'Ruang Kreatif',
        'Studio Photography',
        'Lab Analisis Data',
        'Perpustakaan Bisnis',
        'Ruang Diskusi Bisnis'
      ]),
      achievements: JSON.stringify([
        'Juara 1 LKS Digital Marketing Tingkat Kabupaten 2024',
        'Juara 2 Kompetisi Social Media Marketing 2024',
        'Finalis LKS E-Commerce Tingkat Nasional 2023',
        'Juara 1 Kompetisi Content Creator 2023',
        'Juara Harapan 1 Business Plan Competition 2023'
      ]),
      certifications: JSON.stringify([
        { name: 'Google Digital Garage', level: 'Fundamental', desc: 'Sertifikasi Google' },
        { name: 'Meta Blueprint', level: 'Professional', desc: 'Sertifikasi Meta' },
        { name: 'Google Analytics', level: 'Professional', desc: 'Sertifikasi Google Analytics' },
        { name: 'BNSP SKKNI Pemasaran Digital', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'HubSpot Academy', level: 'Professional', desc: 'Sertifikasi HubSpot' },
        { name: 'BNSP SKKNI E-Commerce', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' }
      ]),
      gallery: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
      testimonials: JSON.stringify([
        {
          name: 'Andi Pratama',
          year: 'Angkatan 2020',
          role: 'Digital Marketer di Jakarta',
          text: 'Ilmu digital marketing yang saya dapatkan sangat relevan dengan kebutuhan industri. Sekarang saya bekerja di agensi digital marketing ternama.'
        },
        {
          name: 'Sarah Wijaya',
          year: 'Angkatan 2021',
          role: 'E-Commerce Manager',
          text: 'Praktik e-commerce di sekolah sangat membantu memahami cara mengelola toko online yang sukses.'
        },
        {
          name: 'Budi Santoso',
          year: 'Siswa Kelas XII',
          role: 'Siswa Aktif',
          text: 'Belajar di BDP sangat relevan dengan perkembangan bisnis saat ini. Saya siap terjun ke dunia bisnis digital.'
        }
      ])
    },
    {
      programCode: 'ak',
      title: 'Akuntansi (AK)',
      description: 'Program Keahlian Akuntansi (AK) SMKS PGRI Wonoasri dirancang untuk mencetak lulusan yang kompeten dalam pembukuan, perpajakan, analisis keuangan, dan aplikasi akuntansi berbasis komputer.',
      vision: 'Menjadi program keahlian Akuntansi unggulan yang menghasilkan lulusan profesional di bidang akuntansi dan keuangan yang siap bersaing di dunia kerja.',
      goals: JSON.stringify([
        'Mencetak lulusan yang mahir dalam akuntansi manual dan komputer',
        'Mengembangkan kemampuan analisis keuangan',
        'Mempersiapkan siswa dengan sertifikasi perpajakan',
        'Menanamkan integritas dan etika profesional'
      ]),
      competencies: JSON.stringify([
        'Pembukuan Dasar',
        'Akuntansi Biaya',
        'Akuntansi Keuangan',
        'Perpajakan',
        'Akuntansi Komputer',
        'Analisis Laporan Keuangan',
        'Sistem Informasi Akuntansi',
        'Anggaran Perusahaan',
        'Auditing Dasar',
        'Manajemen Keuangan',
        'Etika Profesi Akuntansi',
        'Kewirausahaan Akuntansi'
      ]),
      subjects: JSON.stringify([
        { name: 'Akuntansi Dasar', desc: 'Konsep dasar akuntansi' },
        { name: 'Akuntansi Keuangan', desc: 'Pencatatan dan pelaporan keuangan' },
        { name: 'Perpajakan', desc: 'Ilmu perpajakan Indonesia' },
        { name: 'Komputer Akuntansi', desc: 'Aplikasi akuntansi berbasis komputer' },
        { name: 'Analisis Keuangan', desc: 'Analisis laporan keuangan' },
        { name: 'Sistem Informasi Akuntansi', desc: 'Sistem akuntansi terkomputerisasi' },
        { name: 'Manajemen Keuangan', desc: 'Manajemen keuangan perusahaan' },
        { name: 'Praktik Kerja Lapangan (PKL)', desc: 'Pengalaman kerja di bidang akuntansi' }
      ]),
      jobs: JSON.stringify([
        'Akuntan',
        'Staff Finance',
        'Staff Accounting',
        'Tax Consultant',
        'Auditor',
        'Financial Analyst',
        'Budget Analyst',
        'Payroll Specialist',
        'Bookkeeper',
        'Treasury Staff',
        'Tax Staff',
        'Finance Manager'
      ]),
      majors: JSON.stringify([
        'Akuntansi (S1/D3)',
        'Manajemen Keuangan (S1/D3)',
        'Perpajakan (S1/D3)',
        'Manajemen (S1/D3)',
        'Ekonomi (S1/D3)',
        'Sistem Informasi (S1/D3)',
        'Manajemen Bisnis (S1/D3)',
        'Akuntansi Sektor Publik (S1/D3)',
        'Banking & Keuangan (S1/D3)',
        'Actuarial Science (S1/D3)',
        'Investment (S1/D3)',
        'Auditing (S1/D3)'
      ]),
      partners: JSON.stringify([
        { name: 'KAP (Kantor Akuntan Publik)', type: 'Public Accounting Firm' },
        { name: 'Kantor Pajak', type: 'Tax Consultant' },
        { name: 'Bank & Lembaga Keuangan', type: 'Financial Institution' },
        { name: 'Perusahaan Manufaktur', type: 'Manufacturing' },
        { name: 'Perusahaan Jasa', type: 'Service Company' },
        { name: 'Multinasional Company', type: 'Multinational' },
        { name: 'BUMN', type: 'State-Owned Enterprise' },
        { name: 'Start-up', type: 'Startup' },
        { name: 'Perdagangan', type: 'Trading' }
      ]),
      facilities: JSON.stringify([
        'Laboratorium Akuntansi',
        'Lab Komputer Akuntansi',
        'Mini Bank',
        'Lab Perpajakan',
        'Perpustakaan Akuntansi',
        'Ruang Diskusi Keuangan',
        'Lab Analisis Laporan',
        'Lab Sistem Informasi Akuntansi',
        'Ruang Praktik Komersial'
      ]),
      achievements: JSON.stringify([
        'Juara 1 LKS Akuntansi Tingkat Kabupaten 2024',
        'Juara 2 Kompetisi Perpajakan 2024',
        'Finalis LKS Financial Literacy Tingkat Nasional 2023',
        'Juara 1 Lomba Analisis Laporan Keuangan 2023',
        'Juara Harapan 1 Kompetisi Computer Accounting 2023'
      ]),
      certifications: JSON.stringify([
        { name: 'Brevet Pajak A', level: 'Professional', desc: 'Sertifikasi perpajakan' },
        { name: 'Brevet Pajak B', level: 'Professional', desc: 'Sertifikasi perpajakan' },
        { name: 'BNSP SKKNI Akuntansi', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'BNSP SKKNI Perpajakan', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'Sertifikat MyOB', level: 'Professional', desc: 'Sertifikasi software akuntansi' },
        { name: 'Sertifikat Zahir', level: 'Professional', desc: 'Sertifikasi software akuntansi' }
      ]),
      gallery: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
      testimonials: JSON.stringify([
        {
          name: 'Dian Saputra',
          year: 'Angkatan 2020',
          role: 'Akuntan di Jakarta',
          text: 'Ilmu akuntansi yang saya dapatkan sangat komprehensif. Saya langsung siap bekerja setelah lulus.'
        },
        {
          name: 'Rina Marlina',
          year: 'Angkatan 2021',
          role: 'Tax Consultant',
          text: 'Pelatihan perpajakan di sekolah sangat membantu. Saya sekarang bekerja sebagai konsultan pajak.'
        },
        {
          name: 'Eko Pratama',
          year: 'Siswa Kelas XII',
          role: 'Siswa Aktif',
          text: 'Belajar akuntansi di sini sangat menantang namun menyenangkan. Fasilitas dan pendukungnya lengkap.'
        }
      ])
    },
    {
      programCode: 'mplb',
      title: 'Manajemen Perkantoran & Layanan Bisnis (MPLB)',
      description: 'Program Keahlian Manajemen Perkantoran & Layanan Bisnis (MPLB) SMKS PGRI Wonoasri dirancang untuk mencetak lulusan yang kompeten dalam administrasi perkantoran, kearsipan, pelayanan prima, dan manajemen bisnis.',
      vision: 'Menjadi program keahlian MPLB unggulan yang menghasilkan lulusan profesional di bidang administrasi perkantoran dan layanan bisnis yang berkarakter.',
      goals: JSON.stringify([
        'Mencetak lulusan profesional di bidang administrasi',
        'Mengembangkan kemampuan pelayanan prima',
        'Mempersiapkan siswa dengan sertifikasi Microsoft Office',
        'Menanamkan etika profesional dan integritas'
      ]),
      competencies: JSON.stringify([
        'Administrasi Perkantoran',
        'Kearsipan & Pengelolaan Dokumen',
        'Pelayanan Prima',
        'Manajemen Bisnis Dasar',
        'Komunikasi Bisnis',
        'Ketatausahaan',
        'Teknologi Informasi Perkantoran',
        'Manajemen Pertemuan',
        'Penanganan Telepon',
        'Penyusunan Laporan',
        'Manajemen Waktu'
      ]),
      subjects: JSON.stringify([
        { name: 'Administrasi Perkantoran', desc: 'Manajemen administrasi kantor' },
        { name: 'Kearsipan', desc: 'Pengelolaan dokumen dan arsip' },
        { name: 'Pelayanan Prima', desc: 'Teknik pelayanan berkualitas' },
        { name: 'Komunikasi Bisnis', desc: 'Komunikasi dalam bisnis' },
        { name: 'Ketatausahaan', desc: 'Teknik pengetikan dan administrasi' },
        { name: 'Teknologi Perkantoran', desc: 'Aplikasi komputer perkantoran' },
        { name: 'Manajemen Bisnis', desc: 'Konsep dasar manajemen bisnis' },
        { name: 'Praktik Kerja Lapangan (PKL)', desc: 'Pengalaman kerja di perkantoran' }
      ]),
      jobs: JSON.stringify([
        'Sekretaris Perusahaan',
        'Staff Administrasi',
        'Customer Service',
        'Receptionist',
        'Staff HRD',
        'Administrasi Keuangan',
        'Office Manager',
        'Executive Assistant',
        'Admin Sales',
        'Admin Operasional',
        'Front Office',
        'Document Controller'
      ]),
      majors: JSON.stringify([
        'Manajemen (S1/D3)',
        'Administrasi Bisnis (S1/D3)',
        'Akuntansi (S1/D3)',
        'Sekretaris (D3)',
        'Ilmu Komunikasi (S1/D3)',
        'Psikologi (S1/D3)',
        'Hukum (S1/D3)',
        'Manajemen SDM (S1/D3)',
        'Manajemen Pemasaran (S1/D3)',
        'Ekonomi (S1/D3)',
        'Sistem Informasi (S1/D3)',
        'Hospitality (S1/D3)'
      ]),
      partners: JSON.stringify([
        { name: 'PT. Telkom Indonesia', type: 'Telecommunication' },
        { name: 'Bank BRI', type: 'Banking' },
        { name: 'Pemerintah Kabupaten', type: 'Government' },
        { name: 'Perusahaan Swasta', type: 'Private Company' },
        { name: 'Hotel Berbintang', type: 'Hospitality' },
        { name: 'RSUD', type: 'Healthcare' },
        { name: 'Multinasional Company', type: 'Multinational' },
        { name: 'Start-up', type: 'Startup' },
        { name: 'BUMN', type: 'State-Owned' }
      ]),
      facilities: JSON.stringify([
        'Laboratorium Administrasi',
        'Lab Komputer Kantor',
        'Ruang Pelayanan Prima',
        'Mini Bank',
        'Ruang Kearsipan',
        'Perpustakaan Administrasi',
        'Lab Komunikasi Bisnis',
        'Ruang Ketatausahaan',
        'Ruang Praktik Komersial'
      ]),
      achievements: JSON.stringify([
        'Juara 1 LKS Administrasi Perkantoran Tingkat Kabupaten 2024',
        'Juara 2 Kompetisi Pelayanan Prima 2024',
        'Finalis LKS Sekretaris Tingkat Nasional 2023',
        'Juara 1 Lomba Kearsipan Digital 2023',
        'Juara Harapan 1 Kompetisi Dokumen Bisnis 2023'
      ]),
      certifications: JSON.stringify([
        { name: 'BNSP SKKNI Administrasi Perkantoran', level: 'Level 3', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'Microsoft Office Specialist', level: 'Professional', desc: 'Sertifikasi Microsoft Office' },
        { name: 'BNSP SKKNI Pelayanan Prima', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' },
        { name: 'TOEIC', level: 'Professional', desc: 'Tes bahasa Inggris bisnis' },
        { name: 'Sertifikat Komputer', level: 'Professional', desc: 'Sertifikasi komputer' },
        { name: 'BNSP SKKNI Kearsipan', level: 'Level 2', desc: 'Sertifikasi kompetensi nasional' }
      ]),
      gallery: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
      testimonials: JSON.stringify([
        {
          name: 'Siti Aminah',
          year: 'Angkatan 2020',
          role: 'Sekretaris PT. Telkom',
          text: 'Ilmu administrasi dan pelayanan prima yang saya dapatkan sangat berguna. Saya langsung diterima kerja setelah lulus.'
        },
        {
          name: 'Rina Kartika',
          year: 'Angkatan 2021',
          role: 'Staff Admin Bank BRI',
          text: 'Praktik di bank yang disediakan sekolah sangat membantu memahami dunia kerja sesungguhnya.'
        },
        {
          name: 'Dewi Sartika',
          year: 'Siswa Kelas XII',
          role: 'Siswa Aktif',
          text: 'Belajar di MPLB sangat menyenangkan. Fasilitas lengkap dan guru-guru yang sangat suportif.'
        }
      ])
    }
  ]

  for (const program of programs) {
    await prisma.programContent.upsert({
      where: { programCode: program.programCode },
      update: program,
      create: program
    })
    console.log(`✅ Seeded program content: ${program.programCode}`)
  }

  console.log('🎉 Program contents seed completed!')
}

async function main() {
  try {
    await seedProgramContents()
  } catch (error) {
    console.error('❌ Error seeding program contents:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
