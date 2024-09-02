import React from 'react';

function ItinerarySection({ trip }) {
    return (
        <div className="mt-5">
            {/* Título de la sección */}
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-left pb-5">
                Itinerario de Viaje
            </h2>

            {/* Contenedor del itinerario */}
            <div className="flex flex-col gap-6">
                {trip?.tripData?.itinerary.map((day, index) => (
                    <div key={index} className="flex flex-col gap-4">

                        {/* Día del itinerario */}
                        <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl text-left text-white bg-gray-800 p-3 rounded-md shadow-lg">
                            Día {day.day}
                        </h3>

                        {/* Actividades del día */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                            {day.schedule.map((activity, idx) => (
                                <div
                                    key={idx}
                                    className="transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => {
                                        const googleMapsUrl = `https://www.google.com/maps?q=${activity.location}, ${trip?.userSelection?.location?.label}`;
                                        window.open(googleMapsUrl, '_blank');
                                    }}
                                >
                                    {/* Imagen del itinerario */}
                                    <div className="relative">
                                        <img
                                            src="/public/22807.jpg"
                                            className="h-[150px] w-full object-cover"
                                            alt="placeholder"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                                    </div>
                                    {/* Detalles de la actividad */}
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
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItinerarySection;
