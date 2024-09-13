import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Corregido a useNavigate
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";
import FooterSection from "@/view-trip/components/FooterSection";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Icono de carga

function MyTrips() {
  const navigate = useNavigate(); // Cambiado de useNavigation a useNavigate
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para la carga

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/"); // Navegar a la página de inicio si no hay usuario
      return;
    }

    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );

    try {
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error al obtener los viajes:", error);
    } finally {
      setLoading(false); // Finalizar la carga después de obtener los datos
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Mis viajes
      </h2>

      {loading ? ( // Mostrar el spinner si está cargando
        <div className="flex justify-center items-center h-48">
          <AiOutlineLoading3Quarters className="h-12 w-12 animate-spin text-orange-500" />
        </div>
      ) : userTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No se encontraron viajes.</p>
      )}

      <FooterSection />
    </div>
  );
}

export default MyTrips;
