"use client";

import { Key, useState } from "react";
import PageTitle from "@/components/ui/PageTitle";
import data from "@/data.json";
import { Autocomplete, AutocompleteItem, Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CentrosDeportivos() {
  const router = useRouter();
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<Key | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Key | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Filtrar los centros deportivos basados en las especializaciones y ubicación
  const filteredCenters = data.centros_deportivos.filter((centro) => {
    const matchesSpecialization =
      !selectedSpecialization ||
      centro.especialidades.includes(selectedSpecialization as string);
    const matchesLocation =
      !selectedLocation || centro.ubicacion === selectedLocation;

    return matchesSpecialization && matchesLocation;
  });

  // Calcular los centros a mostrar según la página actual
  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);
  const displayedCenters = filteredCenters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Obtener una lista única de especializaciones y ubicaciones
  const allSpecializations = Array.from(
    new Set(data.centros_deportivos.flatMap((centro) => centro.especialidades))
  );
  const allLocations = Array.from(
    new Set(data.centros_deportivos.map((centro) => centro.ubicacion))
  );

  return (
    <main className="flex flex-col flex-1 items-center w-full">
      <div className="flex flex-col flex-1 w-full px-8">
        <PageTitle text="Centros Deportivos" />

        {/* Filtros */}
        <div className="mb-8 flex space-x-12 justify-center items-center">
          <div>
            <Autocomplete
              label="Localización"
              labelPlacement="outside"
              size="lg"
              className="max-w-md"
              onSelectionChange={(value) => setSelectedLocation(value)}
            >
              {allLocations.map((ubicacion) => (
                <AutocompleteItem key={ubicacion} textValue={ubicacion}>
                  {ubicacion}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>

          <div>
            <Autocomplete
              label="Especialidad"
              labelPlacement="outside"
              size="lg"
              className="max-w-md"
              onSelectionChange={(value) => setSelectedSpecialization(value)}
            >
              {allSpecializations.map((especialidad) => (
                <AutocompleteItem key={especialidad} textValue={especialidad}>
                  {especialidad}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </div>

        {/* Tarjetas de centros deportivos */}
        <div>
          {filteredCenters.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                {displayedCenters.map((centro, index) => (
                  <div
                    key={index}
                    className="bg-white max-w-sm shadow-sm shadow-gray-800 rounded-lg p-6 hover:shadow-xl hover:shadow-gray-800 transition-shadow duration-300 hover:cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/centros-deportivos/${centro.nombre
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`
                      );
                    }}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {centro.nombre}
                    </h2>
                    <p className="text-gray-500">{centro.ubicacion}</p>
                    <h3 className="text-lg font-medium text-gray-700 mt-4">
                      Especializaciones:
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {centro.especialidades.map((especializacion, idx) => (
                        <li key={idx}>{especializacion}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center mb-8">
                  <Pagination
                    color="primary"
                    page={currentPage}
                    total={totalPages}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg font-medium text-gray-700">No se encontraron centros deportivos para los filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
