'use client'

import { redirect, useParams } from "next/navigation";
import data from "@/data.json";

export default function CenterPage() {
  const params = useParams();

  const center = data.centros_deportivos.find(
    (center) => center.nombre.toLowerCase().replace(/\s+/g, '-') === params.id
  );

  if (!center) {
    redirect("/not-found");
  }

  return (
    <div className="my-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-4">{center.nombre}</h1>
        <h2 className="text-xl text-gray-700 mb-12">Ubicación: {center.ubicacion}</h2>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Especialidades</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {center.especialidades.map((especialidad, index) => (
              <li key={index} className="text-lg">{especialidad}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Instalaciones</h3>
          <ul className="space-y-3">
            {center.instalaciones.map((instalacion, index) => (
              <li
                key={index}
                className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100"
              >
                <strong className="text-blue-700">{instalacion.nombre}</strong> -{" "}
                <span className="italic">{instalacion.tipo}</span>{" "}
                <span className="block text-gray-600">Valoración: {instalacion.valoracion}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Actividades</h3>
          <ul className="space-y-3">
            {center.actividades.map((actividad, index) => (
              <li
                key={index}
                className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100"
              >
                <strong className="text-green-700">{actividad.nombre}</strong> -{" "}
                <span className="italic">Monitor: {actividad.monitor}</span>{" "}
                <span className="block text-gray-600">Valoración: {actividad.valoracion}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
