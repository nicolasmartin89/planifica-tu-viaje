import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import HotelSection from '../components/HotelSection';
import ItinerarySection from '../components/ItinerarySection';
import FooterSection from '../components/FooterSection';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      const fetchTripData = async () => {
        try {
          setLoading(true);
          const docRef = doc(db, "AiTrips", tripId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Data DocSnap:", docSnap.data());
            setTrip(docSnap.data());
          } else {
            console.log("Data not exists");
            toast.error("No encontramos ningún viaje.");
          }
        } catch (error) {
          console.error("Error fetching trip data:", error);
          toast.error("Ocurrió un error al obtener la información del viaje.");
        } finally {
          setLoading(false);
        }
      };

      fetchTripData();
    }

    return () => {
      // Cleanup function in case component unmounts
      setTrip(null);
    };
  }, [tripId]);

  if (loading) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  if (!trip) {
    return <div className="text-center py-10">No se encontró el viaje.</div>;
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection trip={trip} />
      <HotelSection trip={trip} />
      <ItinerarySection trip={trip} />
      <FooterSection />
    </div>
  );
}

export default ViewTrip;
