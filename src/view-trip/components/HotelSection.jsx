import React from 'react';
import HotelCard from './HotelCard';

function HotelSection({ trip }) {
    return (
        <div className="mt-8 px-4 lg:px-8">
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-left pb-6 text-gray-800">
                Hoteles Recomendados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCard
                        key={index}
                        hotel={hotel}
                        location={trip?.userSelection?.location?.label}
                    />
                ))}
            </div>
        </div>
    );
}

export default HotelSection;
