import { Schedule } from '@/types/schedule';

const KEY = 'jadwal_schedules';

export function loadSchedules(): Schedule[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSchedules(schedules: Schedule[]): void {
  localStorage.setItem(KEY, JSON.stringify(schedules));
}
