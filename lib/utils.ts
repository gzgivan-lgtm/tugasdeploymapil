export const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

export function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateStr: string) {
  const [year, mon, day] = dateStr.split('-');
  return { day, month: MONTHS[parseInt(mon) - 1], year };
}
