import data from "@/data.json";

export default function CenterPage({ params }: { params: { id: string } }) {
  const center = data.centros_deportivos.find(
    (center) => center.nombre.toLowerCase().replace(/\s+/g, '-') === params.id
  );
  
  // TODO: mostrar pagina de error si no se encuentra el centro deportivo
  // TODO: de page.tsx a component en centros-deportivos
  
  return (
    <div>
      <h1>{center?.nombre}</h1>
      <p>{center?.especialidades.join(", ")}</p>
    </div>
  );
}
