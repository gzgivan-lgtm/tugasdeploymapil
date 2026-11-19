'use client';

import { FilterType } from '@/types/schedule';

const FILTERS: FilterType[] = ['semua', 'hari ini', 'akan datang', 'lewat'];

interface Props {
  active: FilterType;
  onChange: (f: FilterType) => void;
}

export default function FilterTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer
            ${active === f
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-300'
            }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
