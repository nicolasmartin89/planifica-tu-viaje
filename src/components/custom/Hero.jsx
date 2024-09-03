import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-gray-50 p-8">
      <h1 className="text-orange-500 font-extrabold text-5xl sm:text-6xl text-center mb-4">
        Descubre tu próxima aventura!
      </h1>
      <h2 className="font-light text-2xl sm:text-3xl text-gray-700 text-center mb-6">
        Personaliza tu viaje con ayuda de la Inteligencia Artificial
      </h2>
      <p className="text-gray-600 text-lg sm:text-xl font-light text-center mb-8 max-w-xl">
        Tu planificador de viajes personal, que crea itinerarios personalizados adaptados a tus intereses y presupuesto.
      </p>
      <Link to="crear-viaje">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg transition duration-200">
          Comienza Aquí, es Gratis!
        </Button>
      </Link>
    </section>
  );
}

export default Hero;
