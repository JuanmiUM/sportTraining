"use client";

import { useState } from "react";
import { Switch, Avatar } from "@nextui-org/react";

export default function AsistenciaInterface() {
  // Datos simulados
  const initialUsers = [
    {
      id: 1,
      img: "https://i.pravatar.cc/150?img=1",
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "+34 612 345 678",
    },
    {
      id: 2,
      img: "https://i.pravatar.cc/150?img=2",
      name: "Ana García",
      email: "ana.garcia@example.com",
      phone: "+34 612 987 654",
    },
    {
      id: 3,
      img: "https://i.pravatar.cc/150?img=3",
      name: "Luis Sánchez",
      email: "luis.sanchez@example.com",
      phone: "+34 612 234 567",
    },
    {
      id: 4,
      img: "https://i.pravatar.cc/150?img=4",
      name: "Pedro Díaz",
      email: "pedro.diaz@example.com",
      phone: "+34 612 345 890",
    },
    {
      id: 5,
      img: "https://i.pravatar.cc/150?img=5",
      name: "Marta López",
      email: "marta.lopez@example.com",
      phone: "+34 612 123 456",
    },
    {
      id: 6,
      img: "https://i.pravatar.cc/150?img=6",
      name: "Carlos Ruiz",
      email: "carlos.ruiz@example.com",
      phone: "+34 612 234 678",
    },
    {
      id: 7,
      img: "https://i.pravatar.cc/150?img=7",
      name: "Laura Gómez",
      email: "laura.gomez@example.com",
      phone: "+34 612 567 890",
    },
    {
      id: 8,
      img: "https://i.pravatar.cc/150?img=9",
      name: "Raúl Castro",
      email: "raul.castro@example.com",
      phone: "+34 612 678 234",
    },
    {
      id: 9,
      img: "https://i.pravatar.cc/150?img=9",
      name: "Isabel Fernández",
      email: "isabel.fernandez@example.com",
      phone: "+34 612 789 345",
    },
  ];

  const [users, setUsers] = useState(initialUsers);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Asistencia</h1>
      <div className="bg-white p-5 rounded-xl shadow-2xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Foto</th>
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Correo</th>
              <th className="py-2 px-4 text-left">Teléfono</th>
              <th className="py-2 px-4 text-left">Confirmar Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`border-b ${index === users.length - 1 ? "border-b-0" : ""}`}>
                <td className="py-2 px-4">{<Avatar src={user.img} />}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">
                  <Switch />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
