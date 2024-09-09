import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';

function ItineraryCard({ activity, location }) {
    const [photoUrl, setPhotoUrl] = useState('/public/placeholder.jpg');
    const handleClick = () => {
        const googleMapsUrl = `https://www.google.com/maps?q=${activity.location}, ${location}`;
        window.open(googleMapsUrl, '_blank');
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
            
            if (result?.data?.places[0]?.photos?.[3]?.name) {
                const photoName = result.data.places[0].photos[3].name;
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(photoUrl);
            } else {
                setPhotoUrl('/public/no-image-available.jpg');
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl('/public/error-loading-image.jpg');
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
