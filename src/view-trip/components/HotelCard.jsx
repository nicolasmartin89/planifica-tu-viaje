import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React from 'react';
import { useState, useEffect } from 'react';

function HotelCard({ hotel, location }) {
    const handleClick = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            hotel.name + ', ' + location
        )}`;
        window.open(googleMapsUrl, '_blank');
    };

    const [photoUrl, setPhotoUrl] = useState();


    useEffect(() => {
        hotel && GetPlacePhoto()
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.name
        }
        const result = await GetPlaceDetails(data).then(resp => {
            //console.log(resp.data.places[0].photos[2].name)

            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div
            className="rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer shadow-lg"
            onClick={handleClick}
        >
            <div className="relative">
                <img
                    src={photoUrl}
                    alt="placeholder"
                    className="h-[200px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0"></div>
            </div>
            <div className="p-4 bg-gray-800 text-white">
                <h3 className="font-medium text-lg md:text-xl lg:text-2xl">
                    {hotel.name}
                </h3>
                <p className="font-light text-sm md:text-base lg:text-lg mt-1">
                    📍 {hotel.address}
                </p>
                <p className="font-light text-sm md:text-base lg:text-lg mt-1">
                    ⭐ Rating: {hotel.rating}
                </p>
            </div>
        </div>
    );
}

export default HotelCard;
