'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Los datos del formulario son invalidos!" };
  }

  const { name, email, password, birthdate, sport, city } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "El correo ya esta en uso!" };
  }

  await db.user.create({
    data: {
      name,
      birthdate,
      sport,
      city,
      email,
      password: hashedPassword
    }
  });

  return { success: "Su cuenta ha sido registrada correctamente!" };
}