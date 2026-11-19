# Jadwal Saya

Aplikasi pencatatan jadwal berbasis Next.js 16 + TypeScript + Tailwind CSS v4.

## Cara Menjalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Project

```
jadwal-app/
├── app/
│   ├── layout.tsx        # Root layout & metadata
│   ├── page.tsx          # Halaman utama
│   └── globals.css       # Style global + animasi
├── components/
│   ├── ScheduleBoard.tsx # Container utama (state, filter, CRUD)
│   ├── AddForm.tsx       # Form tambah jadwal
│   ├── FilterTabs.tsx    # Tab filter jadwal
│   ├── ScheduleItem.tsx  # Satu item jadwal
│   └── CategoryBadge.tsx # Badge warna kategori
├── lib/
│   ├── storage.ts        # localStorage helper
│   └── utils.ts          # Format tanggal & helper
└── types/
    └── schedule.ts       # TypeScript types
```

## Fitur

- Tambah jadwal dengan tanggal, waktu, kategori, dan judul
- 5 kategori: Meeting, Tugas, Reminder, Acara, Lainnya
- Filter: Semua / Hari Ini / Akan Datang / Lewat
- Data disimpan ke localStorage (tidak hilang saat refresh)
- Responsif untuk desktop dan HP
