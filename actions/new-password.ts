"use server"

import * as z from "zod"
import { NewPasswordSchema } from "@/schemas/index"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (email: string, values: z.infer<typeof NewPasswordSchema>) => {
  const validatedFields = NewPasswordSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Los datos inválidos!" }

  const { password1, password2 } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email) return { error: "El correo no existe!" }

  if (password1 !== password2) return { error: "Las contraseñas no coinciden!" }

  const hashedPassword = await bcrypt.hash(password1, 10)

  await db.user.update({
    where: { email: existingUser.email },
    data: {
      password: hashedPassword
    }
  });

  return { success: "La contraseña ha sido actualizada correctamente!" }
}
