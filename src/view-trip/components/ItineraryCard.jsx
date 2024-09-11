import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useState, useEffect } from 'react';

function ItineraryCard({ activity, location }) {
    const [photoUrl, setPhotoUrl] = useState();

    const handleClick = () => {
        const googleMapsUrl = `https://www.google.com/maps?q=${activity.location}, ${location}`;
        window.open(googleMapsUrl, '_blank');
    };

    useEffect(() => {
        activity && GetPlacePhoto();
    }, [activity]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: activity?.location
        };

        const result = await GetPlaceDetails(data).then(resp => {
            // Obtener la URL de la foto desde la API de Google Places
            const photoUrl = PHOTO_REF_URL.replace(
                '{NAME}',
                resp.data.places[0].photos[1].name
            );
            setPhotoUrl(photoUrl);
        });
    };

    return (
        <div
            className="transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden"
            onClick={handleClick}
        >
            <div className="relative">
                <img
                    src={photoUrl || '/public/placeholder.jpg'} // Mostrar un placeholder mientras se carga la foto
                    className="h-[150px] w-full object-cover"
                    alt="activity location"
                />
                <div className="absolute inset-0 bg-black opacity-0"></div>
            </div>

            <div className="p-4 text-white bg-gray-900 bg-opacity-75">
                <h4 className="font-medium text-lg md:text-xl">
                    📍 {activity.location}
                </h4>
                <p className="font-light text-sm md:text-base mt-1">
                    ⏰ {activity.time} - {activity.estimatedTime}
                </p>
                <p className="font-light text-sm md:text-base mt-1">
                    📝 {activity.details}
                </p>
            </div>
        </div>
    );
}

export default ItineraryCard;
