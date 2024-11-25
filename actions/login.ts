'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { LOGIN_REDIRECT } from '@/lib/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { updateRememberMe } from '@/data/user';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Los datos del formulario son invalidos!" };
  }

  const { email, password, remember = false } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "El correo no existe!" };
  }   
  if (existingUser.recordarme !== remember) {
    await updateRememberMe(existingUser.id, remember);
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: "Las credenciales son invalidas!" };

        default:
          return { error: "Algo salio mal!" };
        
      }
    }
    
    throw error;
  }
}