'use client'

import { User } from "next-auth";
import useUser from "./useUser";
import { api } from "@/trpc/react";

const useGetUser = () => {
  const { email } = useUser() as User;

  if (email) {
    const { data } = api?.user?.getUser?.useQuery({ email: email });

    return data
  }

  return null;
}

export default useGetUser