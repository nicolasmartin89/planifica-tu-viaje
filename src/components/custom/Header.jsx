import { Button } from "../ui/button";

function Header() {
  return (
    <header className="p-4 shadow-md flex justify-between items-center bg-gray-100">
      <a href="/">
        <img src="/logo.svg" alt="Logo Planifica tu viaje" className="h-10 w-auto" />
      </a>
      <div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-200">
          Iniciar Sesión
        </Button>
      </div>
    </header>
  );
}

export default Header;
