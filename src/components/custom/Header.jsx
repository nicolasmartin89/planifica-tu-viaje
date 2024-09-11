import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response);
    },
    onError: (error) => {
      console.error("Error al iniciar sesión", error);
    }
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error("Error al obtener el perfil de usuario", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="p-4 shadow-md flex justify-between items-center bg-gray-100">
      <a href="/">
        <img src="/logo.svg" alt="Logo Planifica tu viaje" className="h-10 w-auto" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Mis Viajes
            </Button>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="Perfil de usuario"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="w-50">
                <h2
                  className="cursor-pointer text-center text-red"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={login}
            variant="outline"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Iniciar Sesión
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
