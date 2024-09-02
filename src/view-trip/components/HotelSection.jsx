import React from 'react';
import { Link } from 'react-router-dom';

function HotelSection({ trip }) {
    return (
        <div className="mt-5">
            {/* Título de la sección */}
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-left pb-5">
                Hoteles Recomendados
            </h2>

            {/* Contenedor de hoteles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <Link to={'https://www.google.com/search?q=' + hotel.name + ", " + hotel.address} target='_blank'>
                        <div
                            key={index}
                            className="relative bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                        >
                            {/* Imagen del hotel con overlay */}
                            <div className="relative">
                                <img
                                    src="/public/22807.jpg"
                                    alt="placeholder"
                                    className="h-[200px] w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-40"></div>
                            </div>

                            {/* Detalles del hotel */}
                            <div className="p-4 text-white bg-gray-600 bg-opacity-75">
                                <h2 className="font-medium text-lg md:text-xl lg:text-2xl">
                                    {hotel.name}
                                </h2>
                                <h2 className="font-light text-sm md:text-base lg:text-lg mt-1">
                                    📍 {hotel.address}
                                </h2>
                                <h2 className="font-light text-sm md:text-base lg:text-lg mt-1">
                                    ⭐ Rating: {hotel.rating}
                                </h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HotelSection;
