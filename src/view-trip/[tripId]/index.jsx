import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import HotelSection from '../components/HotelSection';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId])

  /**
   * Used to get trip information for firebase
   */
  const GetTripData = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      console.log("Data DocSnap:" + docSnap.data())
      setTrip(docSnap.data())
    } else {
      console.log("Data not exists")
      toast("No encontramos ningún viaje")
    }

  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection trip={trip}/>
      <HotelSection trip={trip}/>
      
    </div>
  )
}

export default ViewTrip