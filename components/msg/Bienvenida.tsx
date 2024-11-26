interface BienvenidaProps {
  name: string;
}

export default function Bienvenida({ name }: BienvenidaProps) {
  return (
    <div className="flex flex-col items-center justify-center my-4 bg-white rounded-lg shadow-lg px-8 py-4 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">
        ¡Bienvenido, {name}!
      </h1>
    </div>
  );
}
