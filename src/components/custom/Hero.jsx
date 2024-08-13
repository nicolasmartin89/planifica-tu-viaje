import { Button } from "../ui/button"
import { Link } from "react-router-dom"

function Hero() {
  return (
    <div className="grid-cols-1 gap-2 h-[100vh]">
      <h1 className="text-[#ff7917] font-extrabold text-[60px]">
        Descubre tu próxima aventura!</h1>
      <h1 className="font-extralight text-[40px]">
        Personaliza tu viaje con ayuda de la Inteligencia Artificial</h1>
      <p className="text-gray-700 font-extralight text-[20px]">
        Tu planificador de viajes personal, que crea itinerarios personalizados adaptados a sus intereses y presupuesto.</p>
        <Link to='crear-viaje'>
        <Button className="mt-4">Comienza Aqui, es Gratis!</Button>
      </Link>
    </div>
  )
}

export default Hero