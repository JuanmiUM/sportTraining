import { db } from "@/lib/db";

export const getFirstProgramFromUser = async (userId: string) => {
  // Obtén los programas del usuario ordenados por startDate
  const programs = await db.program.findMany({
    where: {
      userId,
    },
    orderBy: {
      startDate: "asc", // Ordena por startDate de menor a mayor
    },
  });

  // Devuelve el array de programas y el booleano
  return programs.length > 0 ? programs[0] : null  
};