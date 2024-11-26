import data from "@/data.json";

export default function CenterPage({ params }: { params: { id: string } }) {
  const center = data.centros_deportivos.find(
    (center) => center.nombre.toLowerCase().replace(/\s+/g, '-') === params.id
  );

  return (
    <div>
      <h1>{center?.nombre}</h1>
      <p>{center?.especialidades.join(", ")}</p>
    </div>
  );
}
