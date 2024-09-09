import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';

function ItineraryCard({ activity, location }) {
    const [photoUrl, setPhotoUrl] = useState('/public/placeholder.jpg');
    const handleClick = () => {
        const googleSearchUrl = `https://www.google.com/search?q=${activity.location}, ${location}`;
        window.open(googleSearchUrl, '_blank');
    };

    useEffect(() => {
        if (activity) {
            GetPlacePhoto();
        }
    }, [activity]);

    const GetPlacePhoto = async () => {
        try {
            const data = { textQuery: activity?.location };
            const result = await GetPlaceDetails(data);
    
            // Asegurarse de que la respuesta contenga datos válidos
            if (result?.data?.places && result.data.places.length > 0) {
                const photos = result.data.places[0]?.photos;
                // Verificar si hay suficientes fotos y obtener la cuarta foto si existe
                if (photos && photos.length > 3) {
                    const photoName = photos[3]?.photo_reference; // Cambié 'name' a 'photo_reference'
                    if (photoName) {
                        const newPhotoUrl = `${PHOTO_REF_URL}&photoreference=${photoName}&key=YOUR_API_KEY`; // Asegúrate de reemplazar 'YOUR_API_KEY' con tu clave API
                        setPhotoUrl(newPhotoUrl);
                    } else {
                        setPhotoUrl('/public/no-image-available.jpg'); // Imagen por defecto si no hay un nombre de foto
                    }
                } else {
                    setPhotoUrl('/public/no-image-available.jpg'); // Imagen por defecto si no hay suficientes fotos
                }
            } else {
                setPhotoUrl('/public/no-image-available.jpg'); // Imagen por defecto si no hay lugares
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl('/public/error-loading-image.jpg'); // Imagen de error en caso de fallo
        }
    };
    

    return (
        <div
            className="transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden"
            onClick={handleClick}
        >
            <div className="relative">
                <img
                    src={photoUrl}
                    className="h-[150px] w-full object-cover"
                    alt={activity.location || 'placeholder'}
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
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
