import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-footer p-12 space-y-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="font-extrabold text-2xl text-white">SportTraining.com</h1>
          <h3 className="text-md text-white">
            Tu plataforma de entranamiento deportivo personlizada
          </h3>
        </div>
        <div className="flex gap-x-16 text-4xl text-white">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="font-extrabold text-2xl text-white">Idioma</h1>
        <select className="bg-footer text-white text-md py-2 px-4 rounded-xl border-2 border-white focus:outline-none">
          <option value="def">Selecciona un idioma</option>
          <option value="es">Español</option>
          <option value="ca">Català</option>
          <option value="gl">Galego</option>
          <option value="eu">Euskara</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
          <option value="de">Deutsch</option>
          <option value="pt">Português</option>
        </select>
      </div>
      <div>
        <div className="space-y-4">
          <h1 className="font-extrabold text-2xl text-white">Enlaces rapidos</h1>
          <div className="flex justify-between text-white text-md">
            <a href="#">Inicio</a>
            <a href="#">Sobre Nosotros</a>
            <a href="#">Contacto</a>
            <a href="#">Política y Privacidad</a>
            <a href="#">Términos y Condiciones</a>
            <a href="#">Centro de Ayuda</a>
          </div>
        </div>
      </div>
    </div>
  );
}
