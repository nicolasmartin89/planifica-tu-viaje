import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label,
        };
        const result = await GetPlaceDetails(data);
        const photoName = result.data?.places[0]?.photos[3]?.name;
        if (photoName) {
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
            setPhotoUrl(photoUrl);
        }
    };

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg w-full max-w-sm mx-auto">
            <div className="relative">
                <img
                    className="h-[200px] w-full object-cover transition-opacity duration-300 hover:opacity-90"
                    src={photoUrl || '/placeholder.jpg'}
                    alt={trip?.userSelection?.location?.label || 'Trip Image'}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-full opacity-40" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {trip?.userSelection?.location?.label}
                </h2>
                <h3 className="text-gray-700 mb-1">
                    🗓️ Días de viaje: <span className="text-orange-500">{trip?.userSelection?.numberOfDays}</span>
                </h3>
                <h3 className="text-gray-700 mb-1">
                    💰 Presupuesto: <span className="text-orange-500">{trip?.userSelection?.budget}</span>
                </h3>
                <h3 className="text-gray-700">
                    👥 Personas: <span className="text-orange-500">{trip?.userSelection?.people}</span>
                </h3>
            </div>
        </div>
    );
}

export default UserTripCardItem;
