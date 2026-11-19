import { Schedule } from '@/types/schedule';
import { formatDate, todayStr } from '@/lib/utils';
import CategoryBadge from './CategoryBadge';

interface Props {
  schedule: Schedule;
  onDelete: (id: number) => void;
}

export default function ScheduleItem({ schedule, onDelete }: Props) {
  const today = todayStr();
  const isPast = schedule.date < today;
  const isToday = schedule.date === today;
  const { day, month, year } = formatDate(schedule.date);

  return (
    <div className={`flex items-center gap-4 bg-white rounded-xl px-4 py-3.5 shadow-sm animate-fade-in transition-transform hover:-translate-y-0.5 ${isPast ? 'opacity-60' : ''}`}>
      {/* Date badge */}
      <div className="text-center min-w-[48px]">
        <div className={`text-2xl font-black leading-none ${isPast ? 'text-gray-300' : 'text-indigo-600'}`}>
          {day}
        </div>
        <div className="text-[11px] uppercase font-semibold text-gray-400 mt-0.5">
          {month} {year}
        </div>
      </div>

      {/* Divider */}
      <div className={`w-0.5 h-10 rounded-full ${isPast ? 'bg-gray-100' : 'bg-gray-200'}`} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${isPast ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {schedule.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {schedule.time ? (
            <span className="text-xs text-gray-400">🕐 {schedule.time}</span>
          ) : isToday ? (
            <span className="text-xs font-medium text-indigo-500">📌 Hari ini</span>
          ) : null}
          <CategoryBadge category={schedule.category} />
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(schedule.id)}
        className="text-gray-300 hover:text-red-400 transition-colors text-base p-1 cursor-pointer"
        title="Hapus jadwal"
      >
        ✕
      </button>
    </div>
  );
}
