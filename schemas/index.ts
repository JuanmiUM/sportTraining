import { z } from 'zod';

export const LoginSchema  = z.object({
  email: z.string({ required_error: "El correo electrónico es obligatorio" })
    .min(1, "El correo electrónico es obligatorio")
    .email("Correo electrónico no válido"),
  password: z.string({ required_error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres requeridos"),
  remember: z.boolean().default(false).optional(),
});

export const RegisterSchema = z.object({
  name: z.string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es obligatorio")
    .max(32, "Máximo 32 caracteres"),
  birthdate: z.string({ required_error: "La fecha de nacimiento es obligatoria" })
    .min(1, "La fecha de nacimiento es obligatoria")
    .refine(date => new Date(date) <= new Date(), "La fecha de nacimiento no puede ser posterior a la actual"),
  sport: z.string({ required_error: "El deporte es obligatorio" })
    .min(1, "El deporte es obligatorio")
    .max(32, "Máximo 32 caracteres"),
  city: z.string({ required_error: "La ciudad es obligatoria" })
    .min(1, "La ciudad es obligatoria")
    .max(32, "Máximo 32 caracteres"),
  email: z.string({ required_error: "El correo electrónico es obligatorio" })
    .min(1, "El correo electrónico es obligatorio")
    .email("Formato de correo electrónico no válido"),
  password: z.string({ required_error: "La contraseña es obligatoria" })
    .min(6, "Mínimo 6 caracteres requeridos"),
});

export const ResetPasswordSchema = z.object({
  email: z.string({ required_error: "El correo electrónico es obligatorio" })
    .min(1, "El correo electrónico es obligatorio")
    .email("Formato de correo electrónico no válido"),
});


export const NewPasswordSchema = z.object({
  password1: z.string({ required_error: "La contraseña es obligatoria" })
    .min(6, "Mínimo 6 caracteres requeridos"),
  password2: z.string({ required_error: "La contraseña es obligatoria" })
    .min(6, "Mínimo 6 caracteres requeridos")
});

export const NewProgramSchema = z.object({
  startDate: z.string()
    .min(1, "La fecha de inicio es obligatoria.")
    .refine(date => new Date(date) >= new Date(), "La fecha de inicio no puede ser anterior o igual a la actual"),
  numDays: z.number()
    .min(1, { message: "El número de días debe ser mayor a 0" })
    .nonnegative("El número de días no puede ser negativo."),
  timeSlot: z.string()
    .regex(/^(MAÑANAS|TARDES)$/, "La franja horaria debe ser 'MAÑANAS' o 'TARDES'.")
    .min(1, "La franja horaria es obligatoria."),
  center: z.string({ required_error: "El centro deportivo es obligatorio" })
    .min(1, "El centro deportivo es obligatorio")
    .max(32, "Máximo 32 caracteres"),
  sport: z.string({ required_error: "El deporte es obligatorio" })
    .min(1, "El deporte es obligatorio")
    .max(32, "Máximo 32 caracteres"),
});