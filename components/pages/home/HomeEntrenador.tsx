'use client'

import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function EntrenadorInterface() {

  // valores simulados
  const initialPrograms = [
    {
      id: 1,
      userName: "Juan Pérez",
      name: "Programa de Fuerza",
      sportCenter: "Gym A",
      numDays: 3,
      startDate: "2024-01-15",
      timeSlot: "Mañanas",
      personalTrainer: "Carlos López",
    },
    {
      id: 2,
      userName: "Ana García",
      name: "Entrenamiento Cardio",
      sportCenter: "Centro Deportivo B",
      numDays: 5,
      startDate: "2024-01-20",
      timeSlot: "Tardes",
      personalTrainer: "María Rodríguez",
    },
    {
      id: 3,
      userName: "Luis Sánchez",
      name: "Plan de Yoga",
      sportCenter: "Studio C",
      numDays: 2,
      startDate: "2024-02-01",
      timeSlot: "Mañanas",
      personalTrainer: "David Martínez",
    },
    {
      id: 4,
      userName: "Pedro Díaz",
      name: "Entrenamiento HIIT",
      sportCenter: "Centro Fitness D",
      numDays: 4,
      startDate: "2024-02-05",
      timeSlot: "Tardes",
      personalTrainer: "Lucía Fernández",
    },
    {
      id: 5,
      userName: "Marta López",
      name: "Plan de Pilates",
      sportCenter: "Studio E",
      numDays: 3,
      startDate: "2024-03-10",
      timeSlot: "Mañanas",
      personalTrainer: "José García",
    },
    {
      id: 6,
      userName: "Carlos Ruiz",
      name: "Entrenamiento Full Body",
      sportCenter: "Gym F",
      numDays: 5,
      startDate: "2024-03-15",
      timeSlot: "Tardes",
      personalTrainer: "Sofia Martínez",
    },
    {
      id: 7,
      userName: "Laura Gómez",
      name: "Plan de Flexibilidad",
      sportCenter: "Centro Deportivo G",
      numDays: 3,
      startDate: "2024-04-01",
      timeSlot: "Mañanas",
      personalTrainer: "Ricardo Sánchez",
    },
    {
      id: 8,
      userName: "Raúl Castro",
      name: "Entrenamiento de Resistencia",
      sportCenter: "Gym H",
      numDays: 4,
      startDate: "2024-04-10",
      timeSlot: "Tardes",
      personalTrainer: "Beatriz Moreno",
    },
    {
      id: 9,
      userName: "Isabel Fernández",
      name: "Plan de Running",
      sportCenter: "Centro Deportivo I",
      numDays: 6,
      startDate: "2024-05-01",
      timeSlot: "Mañanas",
      personalTrainer: "Antonio Pérez",
    },
  ];
  

  const [programs, setPrograms] = useState(initialPrograms);

  const handleAction = (programId: any) => {
    setPrograms((prevPrograms) =>
      prevPrograms.filter((program) => program.id !== programId)
    );
  };

  const formatDateToDDMMYYYY = (date: any) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Programas de Entrenamiento</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {program.name}
            </h2>
            <p className="text-gray-600 mb-1">
              Usuario: <strong>{program.userName}</strong>
            </p>
            <p className="text-gray-600 mb-1">
              Centro deportivo: <strong>{program.sportCenter}</strong>
            </p>
            <p className="text-gray-600 mb-1">Días: {program.numDays}</p>
            <p className="text-gray-600 mb-1">Franja horaria: {program.timeSlot}</p>
            <p className="text-gray-600 mb-1">
              Entrenador personal: <strong>{program.personalTrainer}</strong>
            </p>
            <p className="text-gray-600 mb-1">
              Fecha de inicio: {formatDateToDDMMYYYY(program.startDate)}
            </p>

            <div className="flex justify-center gap-12 mt-4">
              <Button
                color="danger"
                onClick={() => handleAction(program.id)}
              >
                Rechazar
              </Button>
              <Button
                color="primary"
                onClick={() => handleAction(program.id)}
              >
                Validar
              </Button>
            </div>
          </div>
        ))}

        {programs.length === 0 && (
          <p className="col-span-full text-center text-white text-lg mt-16">
            No quedan programas por validar.
          </p>
        )}
      </div>
    </div>
  );
}
