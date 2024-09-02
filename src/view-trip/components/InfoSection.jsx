import React from 'react';

function InfoSection({ trip }) {
    return (
        <div className="relative overflow-hidden rounded-2xl">
            {/* Imagen con overlay */}
            <div className="relative">
                <img
                    src="/public/22807.jpg"
                    className="h-[340px] w-full object-cover rounded-2xl"
                    alt="placeholder"
                />
                <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
            </div>

            {/* Contenido */}
            <div className="my-5 flex flex-col gap-4 px-5">
                <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-black z-10">
                    {trip?.userSelection?.location?.label}
                </h2>

                <div className="flex flex-wrap gap-3 text-pretty z-10">
                    <div className="p-2 px-4 bg-gray-700 bg-opacity-50 rounded-full text-white text-base md:text-lg lg:text-xl transition duration-300 hover:bg-gray-800">
                        📅 Días de viaje: {trip?.userSelection?.numberOfDays}
                    </div>
                    <div className="p-2 px-4 bg-gray-700 bg-opacity-50 rounded-full text-white text-base md:text-lg lg:text-xl transition duration-300 hover:bg-gray-800">
                        🚀 N° Personas: {trip?.userSelection?.people}
                    </div>
                    <div className="p-2 px-4 bg-gray-700 bg-opacity-50 rounded-full text-white text-base md:text-lg lg:text-xl transition duration-300 hover:bg-gray-800">
                        💰 Presupuesto elegido: {trip?.userSelection?.budget}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
