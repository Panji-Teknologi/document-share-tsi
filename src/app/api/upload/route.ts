import fs, { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ success: false, message: 'No file name provided' }, { status: 400 });
  }

  const path = join('public', 'upload', name);

  try {
    const file = await fs.readFile(path);
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'File not found' }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join('public', 'upload', file.name);
  await writeFile(path, buffer);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') as string;
  const path = join('public', 'upload', name);

  await fs.unlink(path);

  return NextResponse.json({ success: true });
}