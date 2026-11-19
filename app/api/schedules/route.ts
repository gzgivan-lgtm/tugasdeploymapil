import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/schedules
export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM schedules ORDER BY date ASC, time ASC'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST /api/schedules
export async function POST(req: Request) {
  try {
    const { title, date, time, category } = await req.json();

    if (!title || !date || !category) {
      return NextResponse.json({ error: 'Field tidak lengkap' }, { status: 400 });
    }

    const [result]: any = await pool.query(
      'INSERT INTO schedules (title, date, time, category) VALUES (?, ?, ?, ?)',
      [title, date, time ?? '', category]
    );

    const [rows]: any = await pool.query(
      'SELECT * FROM schedules WHERE id = ?',
      [result.insertId]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}
