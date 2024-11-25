import Link from 'next/link'
import { Button } from '@nextui-org/react'
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 p-8 bg-white rounded-3xl p-15 shadow-md">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-700">
            ¡Página no encontrada!
          </h2>
          <p className="text-gray-600">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>

        <Button
            radius="lg"
            className="bg-gradient-to-tr text-md from-turquoise to-purple text-primary-foreground shadow-lg"
            as={Link}
            href="/home"
            size="lg"
          >
            Volver al inicio
          </Button>
      </div>
    </div>
  )
}
