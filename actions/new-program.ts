'use server';

import * as z from 'zod';
import { NewProgramSchema } from '@/schemas';
import { db } from '@/lib/db';
import { currUserId } from '@/lib/auth';
import data from '@/data.json';

export const registerProgram = async (values: z.infer<typeof NewProgramSchema>) => {
  const validatedFields = NewProgramSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Los datos del formulario son invalidos!" };
  }

  const formdata = validatedFields.data;

  const userId = await currUserId()
  if (!userId) {
    return { error: "Ha ocurrido un error al crear el programa!" };
  } 

  const center = data.centros_deportivos.find((center) => center.nombre === formdata.center);
  const trainer = center?.actividades.find((activity) => activity.deporte === formdata.sport)?.monitor || "Entrenador personal";
  const name = center?.actividades.find((activity) => activity.deporte === formdata.sport)?.nombre || "Programa de entrenamiento";

  await db.program.create({
    data: {
      userId,
      name: name,
      startDate: new Date(formdata.startDate),
      numDays: formdata.numDays,
      timeSlot: formdata.timeSlot,
      sportCenter: formdata.center,
      sport: formdata.sport,
      personalTrainer: trainer
    }
  });

  return { success: "Su programa ha sido creado correctamente!" };
}