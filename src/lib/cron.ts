import fs from 'fs-extra';
import path from 'path';
import { addDays, isBefore } from 'date-fns';
import prisma from '@/utils/prisma';
import cron from 'node-cron';

const filesDirectory = path.resolve('./public/upload');

export const deleteOldFiles = async () => {
  console.log('Running auto-delete documents...');

  try {
    const files = await fs.readdir(filesDirectory);
    const now = Date.now();

    for (const file of files) {
      const document = await prisma.document.findFirst({
        where: {
          url: `/upload/${file}`,
        },
      });

      if (document) {
        const documentDate = document.createdAt;
        const filePath = path.join(filesDirectory, file);
        const daysAdded = addDays(documentDate, 7);

        if (isBefore(daysAdded, now)) {
          // console.log(`Deleting file: ${filePath}`);
          await prisma.document.delete({ where: { id: document.id } });
          await fs.remove(filePath);
          // console.log(`File deleted: ${file}`);
          await prisma.document.findMany();
        } else {
          console.log(`File ${filePath} is not ready for deletion.`);
        }
      }
    }
  } catch (err) {
    console.error(`Error during file cleanup: ${err}`);
  }
};

export const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Starting scheduled cron job...');
    await deleteOldFiles();
  });

  console.log('Cron job initialized.');
};