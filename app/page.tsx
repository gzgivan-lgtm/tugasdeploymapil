import ScheduleBoard from '@/components/ScheduleBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f4ff] px-3 sm:px-4 py-6 sm:py-10">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">📅 Jadwal Saya</h1>
          <p className="text-gray-400 mt-1.5 text-xs sm:text-sm">Catat semua agenda dan pengingat Anda</p>
        </div>
        <ScheduleBoard />
      </div>
    </main>
  );
}
