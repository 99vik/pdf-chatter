import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function kindeAuth() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
}
