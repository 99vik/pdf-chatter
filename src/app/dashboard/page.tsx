import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);
  return <p>Dashboard</p>;
}
