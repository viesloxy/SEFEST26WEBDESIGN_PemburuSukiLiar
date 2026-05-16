# 🚀 Kantongek - Gen-Z Personal Finance Tracker

<p align="center">
  <img src="public/images/Logo.svg" alt="Kantongek Logo" width="120" />
</p>

<p align="center">
  <strong>Live Demo:</strong> 👉 <a href="https://kantongek.netlify.app" target="_blank"><strong>kantongek.netlify.app</strong></a>
</p>

<p align="center">
  Kelola uang dengan smarter, simpler, dan lebih menyenangkan.
</p>

<p align="center">
  <a href="https://github.com/yourusername/kantongek/releases">
    <img src="https://img.shields.io/badge/version-1.0.0-A4D624?style=flat-square" alt="Version" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
  </a>
</p>

---

## Deskripsi Proyek

**Kantongek** adalah aplikasi manajemen keuangan pribadi yang dirancang khusus untuk Gen-Z Indonesia. Dengan antarmuka yang modern, intuitif, dan menyenangkan, Kantongek membantu kamu melacak pengeluaran, mengatur budget, dan mencapai tujuan finansial dengan cara yang lebih smart.

### Fitur Utama

- **Pencatatan Transaksi** - Catat setiap pengeluaran dan pemasukan dengan cepat dan akurat
- **Budget Management** - Atur budget per kategori dengan notifikasi batas pengeluaran
- **Tabungan Goals** - Tetapkan tujuan tabungan dan track progress secara real-time
- **Analisis Keuangan** - Grafik dan insight mendalam tentang kebiasaan finansial
- **Gamification** - Streak harian dan achievement untuk membangun kebiasaan baik
- **Dark Mode** - Tampilan gelap untuk kenyamanan mata
- **Offline Mode** - Akses tanpa internet, semua data tersimpan di perangkatmu
- **Custom Cursor** - Custom cursor interaktif untuk pengalaman lebih engaging
- **Responsive Design** - Tampilan optimal di desktop dan mobile

---

## Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| **Next.js 14** | React framework dengan App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Animasi dan motion library |
| **Chart.js** | Visualisasi data dan grafik |
| **Lucide React** | Icon library |
| **LocalStorage** | Penyimpanan data offline |

---

## Getting Started

### Prerequisites

- Node.js 18.17 atau lebih baru
- npm atau yarn atau pnpm

### Installation

1. **Clone repository**

```bash
git clone https://github.com/yourusername/kantongek.git
cd kantongek
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Jalankan development server**

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. **Buka di browser**

Buka [http://localhost:3000](http://localhost:3000) untuk melihat landing page.

---

## Cara Login

### Demo Account (Recommended untuk testing)

| Field | Value |
|-------|-------|
| **Email** | `demo@kantongek.id` |
| **Password** | `demo123` |

Demo account sudah dilengkapi dengan sample data transaksi, budget, dan tabungan untuk memberikan pengalaman lengkap aplikasi.

### Register Akun Baru

Kamu juga bisa membuat akun baru dengan:

1. Klik tombol **Daftar** di navbar
2. Isi nama lengkap, email, dan password
3. Klik **Daftar Sekarang**
4. Kamu akan langsung login dan bisa mulai menggunakan aplikasi

> **Catatan:** Data registrasi disimpan di LocalStorage browser. Setiap browser/device akan memiliki data yang terpisah.

---

## Struktur Proyek

```
KANTONGEK/
├── public/
│   └── images/              # Gambar assets (logo, mockups, icons)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── login/           # Login page
│   │   ├── register/       # Register page
│   │   └── dashboard/       # Dashboard pages
│   │       ├── page.tsx     # Dashboard home
│   │       ├── transactions/# Transaksi page
│   │       ├── budget/      # Budget page
│   │       ├── savings/     # Tabungan goals page
│   │       ├── stats/       # Statistik page
│   │       ├── gamification/# Achievement page
│   │       └── settings/    # Pengaturan page
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── landing-page/    # Landing page components
│   │   ├── transactions/   # Transaction components
│   │   ├── budget/          # Budget components
│   │   ├── savings/         # Savings components
│   │   ├── stats/           # Statistics components
│   │   ├── gamification/    # Gamification components
│   │   ├── settings/        # Settings components
│   │   └── providers/       # Context providers
│   ├── context/             # React Context
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── DashboardContext.tsx # Dashboard state
│   ├── lib/                 # Utility functions
│   │   ├── auth.ts          # Auth functions
│   │   ├── storage.ts       # Storage utilities
│   │   ├── calculations.ts # Calculation utilities
│   │   ├── validation.ts   # Validation utilities
│   │   └── settings.ts      # Settings utilities
│   └── assets/
│       └── images/          # Local image assets
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

---

## Halaman Utama

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page dengan fitur, preview, dan testimoni |
| `/login` | Halaman login |
| `/register` | Halaman registrasi |
| `/dashboard` | Dashboard utama dengan ringkasan keuangan |
| `/dashboard/transactions` | Daftar semua transaksi |
| `/dashboard/budget` | Manajemen budget per kategori |
| `/dashboard/savings` | Tabungan goals |
| `/dashboard/stats` | Statistik dan grafik keuangan |
| `/dashboard/gamification` | Achievement dan streak |
| `/dashboard/settings` | Pengaturan akun dan aplikasi |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Run ESLint |

---

## Desain & UX

### Design System

- **Primary Color:** `#A4D624` (Hijau lime segar)
- **Font Family:** Poppins (Google Fonts)
- **Dark Mode:** Didukung penuh dengan toggle di navbar
- **Animasi:** Smooth transitions dengan Framer Motion
- **Custom Cursor:** Brand cursor untuk pengalaman interaktif

### Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| `sm` | 375px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

---

## Data Storage

Aplikasi ini menggunakan **LocalStorage** untuk menyimpan semua data secara lokal di browser:

- `kantongek_users` - Data user yang terdaftar
- `kantongek_current_user` - Session user yang sedang login
- `kantongek_transactions` - Data transaksi
- `kantongek_budgets` - Data budget
- `kantongek_savings` - Data tabungan goals
- `kantongek_settings` - Pengaturan aplikasi

> **Keamanan:** Data disimpan di browser masing-masing. Tidak ada data yang dikirim ke server eksternal.

---

## Lisensi

Proyek ini menggunakan **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.

---

## Website

- **Website:** https://kantongek.netlify.app

---

<p align="center">
  Dibuat dengan ❤️ untuk Gen-Z Indonesia
</p>

<p align="center">
  <sub>Kantongek - Kelola keuanganmu dengan style</sub>
</p>
