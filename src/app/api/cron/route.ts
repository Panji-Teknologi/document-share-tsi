import { deleteOldFiles } from '@/lib/cron';
import { NextResponse } from 'next/server';
import cron from 'node-cron';

// Start cron job
let cronStarted = false;

export async function GET() {
  if (!cronStarted) {
    // cron.schedule('0 0 * * *', async () => {
    cron.schedule('* * * * * *', async () => {
      console.log('Running cron job...');
      await deleteOldFiles();
    });
    cronStarted = true;
    console.log('Cron job initialized.');
  }
  return NextResponse.json({ message: 'Cron job is running' });
}
