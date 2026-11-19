export const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

export function todayStr(): string {
  if (typeof window === 'undefined') return '';
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function formatDate(dateStr: string) {
  const [year, mon, day] = dateStr.split('-');
  return { day, month: MONTHS[parseInt(mon) - 1], year };
}
