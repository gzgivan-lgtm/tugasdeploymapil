import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// DELETE /api/schedules/:id
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM schedules WHERE id = ?', [Number(id)]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
