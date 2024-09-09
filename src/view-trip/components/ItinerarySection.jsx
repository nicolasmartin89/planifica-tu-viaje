import React from 'react';
import ItineraryCard from './ItineraryCard';

function ItinerarySection({ trip }) {
    return (
        <div className="mt-8 px-4 lg:px-8">
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-left pb-6 text-gray-800">
                Itinerario de Viaje
            </h2>

            <div className="flex flex-col gap-8">
                {trip?.tripData?.itinerary.map((day, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl text-left text-white bg-gray-800 p-4 rounded-md shadow-md">
                            Día {day.day}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {day.schedule.map((activity, idx) => (
                                <ItineraryCard
                                    key={idx}
                                    activity={activity}
                                    location={trip?.userSelection?.location?.label}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItinerarySection;
