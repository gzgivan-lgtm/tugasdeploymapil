'use client';

import { useRef, useState } from 'react';
import { Category, Schedule } from '@/types/schedule';
import { todayStr } from '@/lib/utils';

interface Props {
  onAdd: (s: Omit<Schedule, 'id'>) => void;
}

const CATEGORIES: Category[] = ['meeting', 'tugas', 'reminder', 'acara', 'lainnya'];

export default function AddForm({ onAdd }: Props) {
  const [date, setDate] = useState(todayStr());
  const [time, setTime] = useState('');
  const [category, setCategory] = useState<Category>('meeting');
  const [title, setTitle] = useState('');
  const [shake, setShake] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);

  function handleAdd() {
    if (!date || !title.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    onAdd({
      date,
      time,
      category,
      title: title.trim(),
    });

    setTitle('');
    setTime('');
    setDate(todayStr());
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm shadow-indigo-100 mb-4 sm:mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Tanggal — full width on mobile */}
        <div className="flex flex-col gap-1.5 col-span-1">
          <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-indigo-400 focus:bg-white transition"
          />
        </div>

        {/* Waktu */}
        <div className="flex flex-col gap-1.5 col-span-1">
          <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Waktu (opsional)</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-indigo-400 focus:bg-white transition"
          />
        </div>

        {/* Kategori — full width on mobile, col 3 on sm+ */}
        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
          <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-indigo-400 focus:bg-white transition"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Judul — always full width */}
        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-3">
          <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Judul Jadwal</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="contoh: Meeting project bersama tim"
            maxLength={80}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-indigo-400 focus:bg-white transition"
          />
        </div>
      </div>

      <button
        ref={btnRef}
        onClick={handleAdd}
        className={`mt-4 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-xl transition-all cursor-pointer text-sm sm:text-base ${shake ? 'animate-shake' : ''}`}
      >
        + Tambah Jadwal
      </button>
    </div>
  );
}
