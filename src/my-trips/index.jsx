import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Corregido a useNavigate
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";
import FooterSection from "@/view-trip/components/FooterSection";

function MyTrips() {
  const navigate = useNavigate(); // Cambiado de useNavigation a useNavigate
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/"); // Navegar a la página de inicio si no hay usuario
      return;
    }

    setUserTrips([]);
    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Mis viajes
      </h2>
      {userTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No trips found.</p>
      )}
      <FooterSection />
    </div>
  );

}

export default MyTrips;
