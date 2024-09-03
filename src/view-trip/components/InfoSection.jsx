import React from 'react';

function InfoSection({ trip }) {
    return (
        <div className="relative overflow-hidden rounded-2xl mt-8 px-4 lg:px-8">
            {/* Imagen de fondo */}
            <div className="relative">
                <img
                    src="/public/22807.jpg"
                    className="h-[340px] w-full object-cover rounded-2xl"
                    alt="placeholder"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="mt-6 px-5">
                <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-white relative z-10">
                    {trip?.userSelection?.location?.label}
                </h2>

                {/* Burbujas de información */}
                <div className="flex flex-wrap justify-center gap-4 mt-4 z-10">
                    {['numberOfDays', 'people', 'budget'].map((item, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-center min-w-[150px] p-4 bg-orange-500 rounded-full text-white text-sm md:text-base lg:text-lg transition duration-300 hover:bg-orange-600 shadow-md"
                        >
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
