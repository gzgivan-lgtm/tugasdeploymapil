export type Category = 'meeting' | 'tugas' | 'reminder' | 'acara' | 'lainnya';

export type FilterType = 'semua' | 'hari ini' | 'akan datang' | 'lewat';

export interface Schedule {
  id: number;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM or ''
  category: Category;
  title: string;
}
