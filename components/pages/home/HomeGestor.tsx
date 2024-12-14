
'use client'

import { useState } from "react";
import data from "@/data.json";

export default function HomeGestor() {
  // Estado para almacenar las valoraciones dinámicas
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  // Actualizar valoraciones
  const handleRating = (type: string, centroIndex: number, itemIndex: number, newRating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [`${type}-${centroIndex}-${itemIndex}`]: newRating,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Realizar valoraciones</h1>

      {data.centros_deportivos.map((centro, centroIndex) => (
        <div key={centro.nombre} className="mb-8 border p-4 shadow bg-white rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">{centro.nombre}</h2>
          <p className="text-gray-600 mb-4">Ubicación: {centro.ubicacion}</p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold">Instalaciones</h3>
              <ul>
                {centro.instalaciones.map((instalacion, instIndex) => (
                  <li key={instalacion.nombre} className="mb-2">
                    <p>
                      <strong>{instalacion.nombre}</strong> ({instalacion.tipo}) - Valoración: 
                      <span style={{ marginLeft: '4px' }}></span>
                      {ratings[`instalacion-${centroIndex}-${instIndex}`] ||
                        instalacion.valoracion.toFixed(1)}
                    </p>
                    <Rating
                      currentRating={
                        ratings[`instalacion-${centroIndex}-${instIndex}`] ||
                        instalacion.valoracion
                      }
                      onRate={(newRating) =>
                        handleRating("instalacion", centroIndex, instIndex, newRating)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Actividades</h3>
              <ul>
                {centro.actividades.map((actividad, actIndex) => (
                  <li key={actividad.nombre} className="mb-2">
                    <p>
                      <strong>{actividad.nombre}</strong> ({actividad.deporte}) - Monitor:
                      <span style={{ marginLeft: '4px' }}></span>

                      {actividad.monitor} - Valoración:
                      <span style={{ marginLeft: '4px' }}></span>
                      {ratings[`actividad-${centroIndex}-${actIndex}`] ||
                        actividad.valoracion.toFixed(1)}
                    </p>
                    <Rating
                      currentRating={
                        ratings[`actividad-${centroIndex}-${actIndex}`] ||
                        actividad.valoracion
                      }
                      onRate={(newRating) =>
                        handleRating("actividad", centroIndex, actIndex, newRating)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente de valoración de estrellas
interface RatingProps {
  currentRating: number;
  onRate: (rating: number) => void;
}

function Rating({ currentRating, onRate }: RatingProps) {
  return (
    <div className="flex items-center mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`mx-1 text-2xl ${
            star <= currentRating ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
