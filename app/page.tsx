import ScheduleBoard from '@/components/ScheduleBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f4ff] px-4 py-10">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-indigo-600 tracking-tight">📅 Jadwal Saya</h1>
          <p className="text-gray-400 mt-2 text-sm">Catat semua agenda dan pengingat Anda</p>
        </div>

        <ScheduleBoard />
      </div>
    </main>
  );
}
