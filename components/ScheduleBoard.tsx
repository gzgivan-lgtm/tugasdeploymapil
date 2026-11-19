'use client';

import { useEffect, useState } from 'react';
import { FilterType, Schedule } from '@/types/schedule';
import { todayStr } from '@/lib/utils';
import AddForm from './AddForm';
import FilterTabs from './FilterTabs';
import ScheduleItem from './ScheduleItem';

export default function ScheduleBoard() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filter, setFilter] = useState<FilterType>('semua');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ambil semua jadwal dari API
  async function fetchSchedules() {
    try {
      const res = await fetch('/api/schedules');
      if (!res.ok) throw new Error('Gagal memuat jadwal');
      const data = await res.json();
      setSchedules(data);
    } catch (e) {
      setError('Tidak dapat terhubung ke database.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSchedules(); }, []);

  // Tambah jadwal baru
  async function handleAdd(s: Omit<Schedule, 'id'>) {
    try {
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s),
      });
      if (!res.ok) throw new Error();
      const created: Schedule = await res.json();
      setSchedules(prev =>
        [...prev, created].sort(
          (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
        )
      );
    } catch {
      alert('Gagal menyimpan jadwal. Periksa koneksi database.');
    }
  }

  // Hapus jadwal
  async function handleDelete(id: number) {
    try {
      await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
      setSchedules(prev => prev.filter(s => s.id !== id));
    } catch {
      alert('Gagal menghapus jadwal.');
    }
  }

  const today = todayStr();

  const filtered = schedules.filter((s) => {
    if (filter === 'hari ini')    return s.date === today;
    if (filter === 'akan datang') return s.date > today;
    if (filter === 'lewat')       return s.date < today;
    return true;
  });

  return (
    <>
      <AddForm onAdd={handleAdd} />

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm shadow-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-600 text-sm uppercase tracking-wide">Daftar Jadwal</h2>
          <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
            {filtered.length} jadwal
          </span>
        </div>

        <FilterTabs active={filter} onChange={setFilter} />

        {loading ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-3 animate-pulse">⏳</div>
            <p className="text-sm">Memuat jadwal...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-3xl mb-3">⚠️</div>
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={fetchSchedules}
              className="mt-3 text-xs text-indigo-500 underline cursor-pointer"
            >
              Coba lagi
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🗓️</div>
            <p className="text-sm">Belum ada jadwal di sini.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filtered.map((s) => (
              <ScheduleItem key={s.id} schedule={s} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
