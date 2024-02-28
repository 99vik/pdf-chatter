'use server';

import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { z } from 'zod';

const inputSchema = z.object({
  fileid: z.string().uuid(),
  message: z.string().min(1),
});

export async function sendMessage(formData: FormData) {
  const result = inputSchema.safeParse({
    fileid: formData.get('fileid'),
    message: formData.get('messageInput'),
  });

  if (!result.success) {
    return { error: 'Invalid message input' };
  }

  const user = await kindeAuth();
  if (!user || !user.id) return { error: 'Invalid user session.' };

  const data = result.data;

  const file = await db.file.findFirst({
    where: {
      id: data.fileid,
      userId: user.id,
    },
  });

  if (!file) return { error: 'File does not exist.' };

  return { data };
}
