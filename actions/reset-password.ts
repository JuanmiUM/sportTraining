"use server"

import * as z from "zod"
import { ResetPasswordSchema } from "@/schemas/index"
import { getUserByEmail } from "@/data/user"

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)
  if (!validatedFields.success) return { error: "El correo es invalido!" }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email) return { error: "El correo no existe!" }

  return { success: "El correo ha sido encontrado!" }

}
