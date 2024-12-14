import { auth } from "@/auth";

export const currUser = async () => {
  const session = await auth();

  return session?.user;
}

export const currUserEmail = async () => {
  const session = await auth();

  return session?.user.email;
}

export const currUserId= async () => {
  const session = await auth();

  return session?.user.id;
}