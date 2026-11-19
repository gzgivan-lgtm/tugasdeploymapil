'use client';

import { useEffect, useState } from 'react';
import { FilterType, Schedule } from '@/types/schedule';
import { loadSchedules, saveSchedules } from '@/lib/storage';
import { todayStr } from '@/lib/utils';
import AddForm from './AddForm';
import FilterTabs from './FilterTabs';
import ScheduleItem from './ScheduleItem';

export default function ScheduleBoard() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filter, setFilter] = useState<FilterType>('semua');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSchedules(loadSchedules());
    setMounted(true);
  }, []);

  function handleAdd(s: Schedule) {
    const updated = [...schedules, s].sort(
      (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
    );
    setSchedules(updated);
    saveSchedules(updated);
  }

  function handleDelete(id: number) {
    const updated = schedules.filter((s) => s.id !== id);
    setSchedules(updated);
    saveSchedules(updated);
  }

  const today = todayStr();

  const filtered = schedules.filter((s) => {
    if (filter === 'hari ini')    return s.date === today;
    if (filter === 'akan datang') return s.date > today;
    if (filter === 'lewat')       return s.date < today;
    return true;
  });

  if (!mounted) return null;

  return (
    <>
      <AddForm onAdd={handleAdd} />

      <div className="bg-white rounded-2xl p-6 shadow-sm shadow-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-600 text-sm uppercase tracking-wide">Daftar Jadwal</h2>
          <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
            {filtered.length} jadwal
          </span>
        </div>

        <FilterTabs active={filter} onChange={setFilter} />

        {filtered.length === 0 ? (
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
