import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const updateRememberMe = async (id: string, remember: boolean) => {
  try {
    const user = await db.user.update({
      where: { id },
      data: { recordarme: remember },
    });
    return user;
  } catch {
    return null;
  }
};

export const getPuntosEstrellaFromUser = async (userId: string) => {
  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    
    return user?.puntosEstrella || 0;
  } catch {
    return 0;
  }
};
