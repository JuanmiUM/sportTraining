"use server";

import PageTitle from "@/components/ui/PageTitle";
import { getAllProgramsFromUser } from "@/data/programas";
import ProgramButton from "@/components/ui/programButton";

interface ProgramasProps {
  userId: string;
}

export default async function Programas({ userId }: ProgramasProps) {
  const programas = await getAllProgramsFromUser(userId);

  // Calcular cuántos espacios faltan para completar el grid
  const remainingItems = 8 - programas.length;

  function formatDateToDDMMYYYY(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados.
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <main className="flex flex-col flex-1 items-center w-full h-full">
      <div className="flex flex-col flex-1 w-full px-8">
        <PageTitle text="Programas de entrenamiento" />

        {/* Tarjetas de centros deportivos */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {programas.map((programa, index) => (
              <div
                key={index}
                className="bg-white h-[280px] w-[320px] shadow-sm shadow-gray-800 rounded-lg p-6 hover:shadow-xl hover:shadow-gray-800 transition-shadow duration-300 hover:cursor-pointer"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  {programa.name}
                </h2>
                <h4 className="text-lg font-regular text-gray-800 mb-10">
                  {programa.sportCenter}
                </h4>
                <p>
                  Número dde días: {programa.numDays}
                  <br />
                  Fecha de inicio: {formatDateToDDMMYYYY(programa.startDate)}
                </p>
                <div className="w-full flex justify-center items-center gap-8 mt-8">
                  <ProgramButton text="Modificar" type="modify" progId={programa.id} />

                  <ProgramButton text="Eliminar" type="delete" progId={programa.id} />
                </div>
              </div>
            ))}

            {/* Elemento vacío con botón para completar el grid */}
            {remainingItems > 0 && (
              <div className="w-[320px] h-[280px] shadow-sm shadow-gray-800 rounded-lg p-6 hover:shadow-xl hover:shadow-gray-800 transition-shadow duration-300 hover:cursor-pointer flex justify-center items-center">
                <ProgramButton text="Crear más programas" type="add" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
