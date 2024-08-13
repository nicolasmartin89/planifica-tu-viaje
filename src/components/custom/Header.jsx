import { Button } from "../ui/button"

function Header() {
  return (
    <div className="p-2 shadow-sm flex justify-between">
      <a href='/'>
      <img src="/logo.svg" alt="Logo Planifica tu viaje" />
      </a>
      <div>
        <Button>Iniciar Sesion</Button>
      </div>
    </div>
  )
}

export default Header