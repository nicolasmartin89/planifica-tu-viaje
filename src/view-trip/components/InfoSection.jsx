import React from 'react';

function InfoSection({ trip }) {
    return (
        <div className="relative overflow-hidden rounded-2xl mt-8 px-4 lg:px-8">
            <div className="relative">
                <img
                    src="/public/22807.jpg"
                    className="h-[340px] w-full object-cover rounded-2xl"
                    alt="placeholder"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
            </div>

            <div className="my-6 flex flex-col gap-4 px-5">
                <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-800 z-10">
                    {trip?.userSelection?.location?.label}
                </h2>

                <div className="flex flex-wrap gap-3 text-white z-10">
                    {['numberOfDays', 'people', 'budget'].map((item, index) => (
                        <div key={index} className="p-2 px-4 bg-orange-500 rounded-full text-white text-base md:text-lg lg:text-xl transition duration-300 hover:bg-orange-600">
                            {item === 'numberOfDays' && `📅 Días de viaje: ${trip?.userSelection?.numberOfDays}`}
                            {item === 'people' && `🚀 N° Personas: ${trip?.userSelection?.people}`}
                            {item === 'budget' && `💰 Presupuesto elegido: ${trip?.userSelection?.budget}`}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
