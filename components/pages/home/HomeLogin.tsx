import HomeCard from "@/components/ui/homeCard";
import CustomButton from "@/components/ui/customButton";
import { getFirstProgramFromUser } from "@/data/programas";
import { getPuntosEstrellaFromUser } from "@/data/user";
import { Star, Map, Calendar } from "lucide-react";


interface HomeLoginProps {
  userId: string;
}

export default async function HomeLogin({ userId }: HomeLoginProps) {

  const program = await getFirstProgramFromUser(userId);
  const puntosEstrella = await getPuntosEstrellaFromUser(userId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <HomeCard
        title="Nuevo Programa de Entrenamiento"
        mainContent={<CustomButton text="Crear Nuevo" link="/programas/nuevo-programa" />}
        info="Crea y personaliza tu programa de entrenamiento ahora"
      />
      <HomeCard
        title="Puntos Estrella"
        mainContent={<p className="text-4xl font-bold">{puntosEstrella}</p>}
        icon={<Star />}
        info="Puntos disponibles"
      />
      {program && (
        <>
          <HomeCard
            title="Centro Deportivo"
            mainContent={<p className="text-4xl font-bold">{program.sportCenter}</p>}
            icon={<Map />}
            info="Tu centro deportivo de referencia"
          />
          <HomeCard
            title="Siguiente Actividad"
            mainContent={<p className="text-4xl font-bold">{program.sport}</p>}
            icon={<Calendar />}
            info={
              program.startDate.toLocaleDateString() ||
              ""
            }
          />
        </>
      )}
    </div>
  );
}
