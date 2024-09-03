import React from 'react';

function HotelSection({ trip }) {
    return (
        <div className="mt-8 px-4 lg:px-8">
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-left pb-6 text-gray-800">
                Hoteles Recomendados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <div
                        key={index}
                        className="rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer shadow-lg"
                        onClick={() => {
                            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                hotel.name + ', ' + trip?.userSelection?.location?.label
                            )}`;
                            window.open(googleMapsUrl, '_blank');
                        }}
                    >
                        <div className="relative">
                            <img
                                src="/public/22807.jpg"
                                alt="placeholder"
                                className="h-[200px] w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
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
                ))}
            </div>
        </div>
    );
}

export default HotelSection;
