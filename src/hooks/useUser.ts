// next
import { useSession } from 'next-auth/react';

const useUser = () => {
  const { data: session } = useSession();
  if (session) {
    const user = session?.user;
    return user;
  }
  return false;
};

export default useUser;
