'use server';

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

  const data = result.data;
  console.log(data);
  return { data };
}
