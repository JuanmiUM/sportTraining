import { auth } from "@/auth";

export const currUser = async () => {
  const session = await auth();

  return session?.user;
}